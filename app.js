import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { DRACOLoader } from './vendor/DRACOLoader.js';
import { DIMENSIONS, pointAllowed, moveWithCollision } from './collision.js';

const $ = id => document.getElementById(id);
const canvas = $('room');
const keys = new Set();
const touchMoves = new Set();
const eyeInput = $('eye-height');
const W=DIMENSIONS.room.width,D=DIMENSIONS.room.depth,S=84,OX=43,OY=28;
const planPoint=(x,depth)=>[OX+x*S,OY+(D-depth)*S];
const state = { ready:false, yaw:0, pitch:-.22, eye:1.65, radius:.20, position:{x:1.27,z:-.38}, velocity:{x:0,z:0}, dimensions:null, plants:[], locked:false, activeView:'entrance' };
let renderer, scene, camera, model, canStart=false;
let noticeTimer;
const notice = text => { $('notice').textContent=text;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{$('notice').textContent='';},3800); };
const fail = error => { console.error(error);$('loading').hidden=true;$('error').hidden=false;$('error-message').textContent=error.message||'Please reload the page or try a browser with WebGL enabled.'; };

try {
  renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  scene = new THREE.Scene();scene.background = new THREE.Color('#a9b6ba');
  camera = new THREE.PerspectiveCamera(80,1,.035,70);camera.rotation.order='YXZ';
  resize();
  new ResizeObserver(resize).observe($('app'));
  canStart=true;
} catch(error) { fail(error); }

async function load(){
  const metaResponse=await fetch('./export-metadata.json');
  const meta=metaResponse.ok?await metaResponse.json():{};
  const dimensionResponse=await fetch('./dimensions.json');
  if(!dimensionResponse.ok)throw new Error('The room measurements could not be loaded. Please reload.');
  state.dimensions=await dimensionResponse.json();
  if(meta.room_dimensions_m&&meta.room_dimensions_m.some((v,i)=>Math.abs(v-[W,D,DIMENSIONS.room.maxCeilingHeight][i])>.00001))throw new Error('The room model and measurements do not match. Please reload the latest version.');
  state.plants=meta.collision_obstacles||[];
  const loader=new GLTFLoader();
  const draco=new DRACOLoader().setDecoderPath('./vendor/draco/').setWorkerLimit(2);
  loader.setDRACOLoader(draco);
  const gltf=await loader.loadAsync('./room.glb',e=>{if(e.total){$('load-progress').value=e.loaded/e.total*100;}});
  draco.dispose();
  model=gltf.scene;
  model.traverse(o=>{
    if(o.isMesh){
      const mats=Array.isArray(o.material)?o.material:[o.material];
      for(const m of mats){for(const key of ['map','normalMap','roughnessMap','emissiveMap'])if(m[key])m[key].anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());}
    }
  });
  scene.add(model);
  // Export contains its own baked light. This light only supports any retained PBR details.
  scene.add(new THREE.HemisphereLight(0xdce5ee,0x534331,.7));
  state.ready=true;$('loading').hidden=true;
  for(const id of ['walk','entrance','behind'])$(id).disabled=false;
  populateMeasurements();drawPlan();jump('entrance');
  const coarse=matchMedia('(pointer:coarse)').matches;
  if(coarse)$('look-hint').textContent='arrows to walk · drag the room to look around';
  requestAnimationFrame(frame);
}
function updateViewLabel(){if(!camera)return;const horizontal=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect));$('view-output').value=camera.fov+'°';$('view-description').textContent=`${camera.fov}° vertically · ${Math.round(horizontal)}° across this window. This changes the camera view, never the room dimensions.`;}
function resize(){if(!renderer||!camera)return;const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();updateViewLabel();}
function populateMeasurements(){
  const d=state.dimensions,mm=value=>(value*1000).toLocaleString('en-GB',{maximumFractionDigits:1})+' mm';
  const values=[['room width',`${d.room.widthInches} in`,mm(d.room.width)],['working depth',`${d.room.depthInches} in`,mm(d.room.depth)],['maximum ceiling',`${d.room.maxCeilingInches} in`,mm(d.room.maxCeilingHeight)],['booth overall',[d.booth.width,d.booth.depth,d.booth.height].map(v=>Math.round(v*1000)).join(' × ')+' mm','width × depth × height'],['equipment span',mm(d.equipment.totalWidth),'including two 25 mm gaps'],['right passage to panel',mm(d.clearances.rightSideToPanel),''],['behind booth to sill',mm(d.clearances.rearToSill),'']];
  document.querySelector('.dimensions').innerHTML=values.map(([label,value,note])=>`<div><dt>${label}</dt><dd>${value}${note?`<span>${note}</span>`:''}</dd></div>`).join('');
}
function applyCamera(){camera.position.set(state.position.x,state.eye,state.position.z);camera.rotation.set(state.pitch,state.yaw,0,'YXZ');}
function resetVelocity(){keys.clear();touchMoves.clear();state.velocity.x=state.velocity.z=0;}
function release(){if(document.pointerLockElement)document.exitPointerLock();resetVelocity();}
function jump(which){
  if(!state.ready)return;
  release();
  const presets={entrance:{position:{x:1.27,z:-.38},yaw:0,pitch:-.22},behind:{position:{x:1.27,z:-2.90},yaw:Math.PI,pitch:-.65}};
  const p=presets[which];
  if(!pointAllowed(p.position.x,-p.position.z,state.radius,state.eye,state.plants)){notice('This viewpoint needs a lower eye height.');return;}
  state.position={...p.position};state.yaw=p.yaw;state.pitch=p.pitch;state.activeView=which;
  for(const id of ['entrance','behind'])$(id).setAttribute('aria-pressed',String(id===which));
  applyCamera();updatePlan();canvas.focus({preventScroll:true});
}
$('entrance').addEventListener('click',()=>jump('entrance'));
$('behind').addEventListener('click',()=>jump('behind'));
$('walk').addEventListener('click',async()=>{
  if(!state.ready)return;
  setPanel(false);canvas.focus({preventScroll:true});
  try { if(canvas.requestPointerLock)await canvas.requestPointerLock();else notice('Drag to look around. Use W A S D to walk.'); }
  catch{notice('Drag to look around. Use W A S D to walk.');}
});
document.addEventListener('pointerlockchange',()=>{state.locked=document.pointerLockElement===canvas;document.body.classList.toggle('locked',state.locked);$('crosshair').hidden=!state.locked;if(!state.locked)resetVelocity();});
document.addEventListener('pointerlockerror',()=>notice('Drag to look around. Use W A S D to walk.'));
document.addEventListener('mousemove',e=>{if(state.locked)look(e.movementX,e.movementY);});
let drag=null;
canvas.addEventListener('pointerdown',e=>{if(state.locked||!state.ready)return;canvas.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId||state.locked)return;look(e.clientX-drag.x,e.clientY-drag.y);drag.x=e.clientX;drag.y=e.clientY;});
for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{drag=null;});
function look(dx,dy){state.yaw-=dx*.0023;state.pitch=THREE.MathUtils.clamp(state.pitch-dy*.0023,-1.40,1.40);}
window.addEventListener('keydown',e=>{
  if(e.code==='Escape'){setPanel(false);release();return;}
  if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)||!state.ready)return;
  if(!$('measure-panel').hidden||(!state.locked&&document.activeElement!==canvas))return;
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){e.preventDefault();keys.add(e.code);}
});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',resetVelocity);
document.addEventListener('visibilitychange',()=>{if(document.hidden)resetVelocity();});
for(const button of document.querySelectorAll('[data-move]')){
  button.addEventListener('pointerdown',e=>{e.preventDefault();touchMoves.add(button.dataset.move);button.setPointerCapture(e.pointerId);});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(name,()=>touchMoves.delete(button.dataset.move));
}
eyeInput.addEventListener('input',()=>{
  const next=Number(eyeInput.value);
  if(!pointAllowed(state.position.x,-state.position.z,state.radius,next,state.plants)){eyeInput.value=state.eye;notice('Move away from the curved wall before raising your eye height.');return;}
  state.eye=next;$('height-output').value=next.toFixed(2)+' m';
});
$('view-angle').addEventListener('input',()=>{if(!camera)return;camera.fov=Number($('view-angle').value);camera.updateProjectionMatrix();updateViewLabel();});
function setPanel(open){$('measure-panel').hidden=!open;$('measure').setAttribute('aria-expanded',String(open));if(open){release();updatePlan();$('close-measure').focus();}else{$('measure').focus();}}
$('measure').addEventListener('click',()=>setPanel($('measure-panel').hidden));
$('close-measure').addEventListener('click',()=>setPanel(false));
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('app').requestFullscreen)await $('app').requestFullscreen();else notice('Use your browser’s full-screen option.');}catch{notice('Use your browser’s full-screen option.');}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Exit full screen':'Enter full screen');resize();});
let last=0,lastPlan=0,frameSamples=0,frameTime=0,measuredFps=0;
function frame(now){
  requestAnimationFrame(frame);const elapsed=(now-last)/1000||0;const dt=Math.min(elapsed,.10);last=now;
  if(!document.hidden){
    if(elapsed>0&&elapsed<.3){frameSamples++;frameTime+=elapsed;if(frameTime>2){measuredFps=frameSamples/frameTime;frameSamples=0;frameTime=0;if(measuredFps<28&&renderer.getPixelRatio()>1){renderer.setPixelRatio(1);resize();}}}
    let forward=Number(keys.has('KeyW')||keys.has('ArrowUp')||touchMoves.has('forward'))-Number(keys.has('KeyS')||keys.has('ArrowDown')||touchMoves.has('back'));
    let side=Number(keys.has('KeyD')||touchMoves.has('right'))-Number(keys.has('KeyA')||touchMoves.has('left'));
    if(keys.has('ArrowLeft'))state.yaw+=dt*1.45;if(keys.has('ArrowRight'))state.yaw-=dt*1.45;
    const length=Math.hypot(forward,side);if(length>1){forward/=length;side/=length;}
    const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?1.65:1.05;
    const tx=(-Math.sin(state.yaw)*forward+Math.cos(state.yaw)*side)*speed;
    const tz=(-Math.cos(state.yaw)*forward-Math.sin(state.yaw)*side)*speed;
    const ease=1-Math.exp(-14*dt);state.velocity.x+=(tx-state.velocity.x)*ease;state.velocity.z+=(tz-state.velocity.z)*ease;
    if(Math.hypot(state.velocity.x,state.velocity.z)>.001){
      const result=moveWithCollision(state.position,{x:state.velocity.x*dt,z:state.velocity.z*dt},{radius:state.radius,eyeHeight:state.eye,extraObstacles:state.plants});
      state.position={x:result.x,z:result.z};state.activeView=null;
      for(const id of ['entrance','behind'])$(id).setAttribute('aria-pressed','false');
    }
    applyCamera();renderer.render(scene,camera);
    if(now-lastPlan>100){updatePlan();lastPlan=now;}
  }
}
function drawPlan(){
  const outline=DIMENSIONS.room.floorPolygon;
  const path=outline.map((p,i)=>(i?'L':'M')+planPoint(...p).join(',')).join(' ')+' Z';
  const [bx,by]=planPoint(.57,2.60);const [sx,sy]=planPoint(.70,3.16);const [wx,wy]=planPoint(1.0275,D);
  $('plan').innerHTML=`<path d="${path}" fill="#303030" stroke="#a6a6a6" stroke-width="2"/><rect x="${sx}" y="${sy}" width="${1.2*S}" height="${.55*S}" fill="none" stroke="#858585" stroke-dasharray="4 4"/><rect x="${bx}" y="${by}" width="${1.4*S}" height="${.65*S}" fill="#5d5b56" stroke="#c6c1b7"/><text x="${bx+.7*S}" y="${by+.38*S}" text-anchor="middle">booth</text><line x1="${wx}" y1="${wy}" x2="${wx+1.12*S}" y2="${wy}" stroke="#d1e2e4" stroke-width="4"/><text x="${wx+.56*S}" y="${wy-10}" text-anchor="middle" class="minor">window · estimated</text><text x="${OX+W*S/2}" y="${OY+D*S+30}" text-anchor="middle">100 in / 2.54 m</text><text x="18" y="${OY+D*S/2}" transform="rotate(-90 18 ${OY+D*S/2})" text-anchor="middle">133 in / 3.378 m</text><g id="plan-you"><path d="M0,-13 L-6,2 L0,-1 L6,2 Z" fill="#f0d7a5"/><circle r="${state.radius*S}" fill="none" stroke="#f0d7a5" stroke-width="1" opacity=".55"/></g><text class="minor" x="${OX+W*S/2}" y="${OY+D*S+50}" text-anchor="middle">arrow = you · ring = walking clearance</text>`;
}
function updatePlan(){const marker=$('plan-you');if(!marker)return;const [x,y]=planPoint(state.position.x,-state.position.z);marker.setAttribute('transform',`translate(${x} ${y}) rotate(${-state.yaw*180/Math.PI})`);}
// Read-only state makes scale and movement verifiable without affecting the room.
window.roomWalkthrough={getState:()=>({ready:state.ready,position:{...state.position},eyeHeight:state.eye,yaw:state.yaw,pitch:state.pitch,bodyRadius:state.radius,verticalFov:camera?.fov,loadedMeshes:model?countMeshes(model):0,renderCalls:renderer?.info.render.calls,triangles:renderer?.info.render.triangles,fps:Math.round(measuredFps)}),getDimensions:()=>structuredClone(state.dimensions)};
function countMeshes(root){let count=0;root.traverse(o=>{if(o.isMesh)count++;});return count;}
drawPlan();updatePlan();
if(canStart)load().catch(fail);
