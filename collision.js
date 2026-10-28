/** Collision for the measured DJ room. Metres. Three.js position.z = -room depth.
 * Furniture is represented by conservative rigid footprints; flexible leaves are excluded.
 * This is a viewing aid, not an ergonomic or access-compliance assessment.
 */
export const DIMENSIONS = {"schemaVersion":1,"units":"metres","source":"Working floor outline and evaluated geometry from outputs/dj-room.blend / 02 Proposed DJ room; solid booth and closed entrance checked 28 October 2026","coordinateSystem":{"source":"Blender x=left to right, y=entrance to window, z=up","viewer":"Three.js x=left to right, y=up, z=minus depth","mapping":["x","z","-y"]},"room":{"width":2.54,"depth":3.3782,"maxCeilingHeight":2.921,"widthInches":100,"depthInches":133,"maxCeilingInches":115,"floorPolygon":[[0,0],[2.4892,0],[2.4892,0.1524],[2.54,0.1524],[2.54,3.3782],[0.635,3.3782],[0.635,2.9972],[0,2.9972]],"curve":{"startHeight":0.889,"ceilingHeight":2.921,"ceilingInset":0.6,"depthExtent":2.9972,"profile":"ellipse: x=.60*(1-sqrt(1-((height-.889)/(2.921-.889))^2))","status":"estimated from photos"},"rearLeftProjection":{"width":0.635,"depth":0.381}},"booth":{"width":1.4,"depth":0.65,"height":0.95,"x":[0.57,1.97],"depthBounds":[1.95,2.6],"centreline":1.27,"centredAcrossFullRoom":true,"construction":"Solid concrete pedestal with continuous filled sides and back to floor; timber countertop and concrete-block front appearance retained. Visual design proposal, not a structural specification.","solidBody":{"object":"Solid concrete booth body 1270 x 575 x 905 mm","width":1.27,"depth":0.575,"height":0.905,"x":[0.635,1.905],"depthBounds":[1.99,2.565],"heightBounds":[0.0,0.905],"status":"chosen design dimensions, verified in Blender"}},"equipment":{"players":{"model":"CDJ-3000X","count":2,"width":0.3446,"depth":0.4904,"height":0.1301},"mixer":{"model":"DJM-V10-LF","width":0.4376,"depth":0.467,"height":0.1079},"gapBetweenUnits":0.025,"totalWidth":1.1768,"tableMarginEachEnd":0.1116},"window":{"width":1.12,"height":1.9,"sillHeight":0.88,"topHeight":2.78,"centreX":1.5875,"sillFrontDepth":3.1732,"status":"estimated from photos"},"clearances":{"sideToBareWall":0.57,"rightSideToPanel":0.485,"leftSideToPanel":0.3475,"rearToWall":0.7782,"rearToSill":0.5732,"rearAtLeftmost65mm":0.3972,"rightAisleCentreWidthWith400mmBody":0.085,"rearCentreDepthWith400mmBody":0.1732},"navigation":{"defaultEyeHeight":1.65,"eyeHeightRange":[1.45,1.85],"bodyRadius":0.2,"headAllowance":0.1,"maxStep":0.025,"rigidBodyModel":"upright cylinder; furniture bounds and floor footprint; flexible leaves do not block navigation","limitations":"400 mm navigation diameter is a viewing aid, not proof that a person can comfortably use each passage.","defaultVerticalFovDegrees":80,"verticalFovRangeDegrees":[60,80],"fovNote":"Adjustable perspective view, default 80 degrees vertical at the user\u2019s request. Horizontal view depends on the browser aspect ratio. This is a viewing setting, not a literal human visual field; it does not change room measurements."},"hotspots":{"entrance":{"label":"entrance","position":{"x":1.27,"y":1.65,"z":-0.38},"lookAt":{"x":1.27,"y":1.4,"z":-2.4}},"front":{"label":"in front of the booth","position":{"x":1.27,"y":1.65,"z":-1.45},"lookAt":{"x":1.27,"y":1.06,"z":-2.4}},"behind":{"label":"behind the decks","position":{"x":1.27,"y":1.65,"z":-2.9},"lookAt":{"x":1.27,"y":1.05,"z":-1.95}},"right":{"label":"right passage","position":{"x":2.21,"y":1.65,"z":-2.69},"lookAt":{"x":1.27,"y":1.1,"z":-2.26}}},"workingDimensions":[{"item":"room width","value":"100 in / 2540 mm","status":"user supplied"},{"item":"maximum room depth","value":"133 in / 3378.2 mm","status":"user supplied"},{"item":"maximum ceiling height","value":"115 in / 2921 mm","status":"user supplied"},{"item":"depth closure","value":"118 in + 15 in = 133 in","status":"working assumption","note":"The original 119 in + 15 in would total 134 in. The model uses 118 in for that segment to close the 133 in overall depth."},{"item":"window and curved ceiling","value":"estimated from photos","status":"unverified"},{"item":"booth and decorative fittings","value":"chosen working sizes","status":"design proposal"},{"item":"equipment envelopes","value":"official external product dimensions","status":"verified against product specifications; visual control detail approximate"}],"obstacles":[{"id":"booth","type":"rect","x":[0.57,1.97],"depth":[1.95,2.6],"height":[0,0.95]},{"id":"right-panel-front","type":"rect","x":[2.455,2.54],"depth":[0.975,1.525],"height":[1.125,2.175]},{"id":"right-panel-rear","type":"rect","x":[2.455,2.54],"depth":[1.865,2.415],"height":[1.125,2.175]},{"id":"left-panel-front","type":"rect","x":[0.1475,0.2225],"depth":[0.975,1.525],"height":[1.125,2.175]},{"id":"left-panel-rear","type":"rect","x":[0.1475,0.2225],"depth":[1.865,2.415],"height":[1.125,2.175]},{"id":"window-sill","type":"rect","x":[0.9725,2.2025],"depth":[3.1732,3.4732],"height":[0.83,0.88]},{"id":"closed-entrance-door","type":"rect","x":[1.16,1.96],"depth":[-0.02,0.02],"height":[0.0,2.04]},{"id":"entrance-handle","type":"rect","x":[1.242,1.278],"depth":[-0.01,0.12],"height":[0.972,1.008]},{"id":"left-plant-cabinet","type":"rect","x":[0.015,0.407],"depth":[0.23,1.25],"height":[0,0.665]},{"id":"left-floor-pot-front","type":"circle","centre":[0.36,1.1],"radius":0.1262,"height":[0,0.2288]},{"id":"left-floor-pot-rear","type":"circle","centre":[0.26,1.48],"radius":0.0954,"height":[0,0.1716]},{"id":"added-foreground-pot","type":"circle","centre":[0.19,0.24],"radius":0.123,"height":[0,0.25]}],"audit":{"checkedCanonicalBlendBounds":true,"rightPanelInnerX":2.4549999237060547,"boothRightX":1.9700000286102295,"sillFrontDepth":3.1731998920440674,"tests":{"status":"passed","checks":31,"rightAisleRoute":[[1.27,-1.45],[2.21,-1.45],[2.21,-2.9],[1.27,-2.9]],"longStepStopsBeforeBooth":true,"curvedWallRespectsEyeHeight":true,"panelCornerSliding":true,"testedRevision":"solid booth and closed entrance, 28 October 2026","closedDoorStopsBody":true,"projectingHandleStopsBody":true,"oldDoorSwingNowClear":true,"entranceDepth_m":0.38},"testCases":["All four hotspots remain navigable at eye heights 1.45, 1.65 and 1.85 m.","Forward and reverse route reaches behind the booth through the right passage.","A single 3 m movement cannot tunnel through the booth; centre stops at depth 1.75 m.","Diagonal input slides beside the right acoustic panel and around its front corner.","The projected window sill, rear left solid corner, right wall and closed entrance door and projecting handle block the body.","At x0.25/depth2.70, eyeheight1.45 fits below the assumed curve; eyeheight1.85 does not.","An invalid externally supplied starting point resolves to a nearby allowed position.","The closed entrance slab and its 120 mm projecting handle stop the 400 mm navigation body.","The former open-door footprint is now navigable.","The 380 mm entrance preset is clear at all three tested eye heights."],"solidRevision":{"status":"passed","method":"evaluated object world bounding boxes, canonical Blender file","sourceReport":"work/solid-model-dimensions.json","solidBodyBounds_m":[[0.635,1.905],[1.99,2.565],[0.0,0.905]],"closedDoorBounds_m":[[1.16,1.96],[-0.02,0.02],[0.0,2.04]],"handleBounds_m":[[1.242,1.278],[-0.01,0.12],[0.972,1.008]],"boothCentreline_m":1.270000010728836,"equipmentCentreline_m":1.2699999809265137,"rightPanelGap_m":0.4849998950958252,"rearSillGap_m":0.5731997489929199}},"sources":["https://downloads.support.alphatheta.com/manuals/dj-players/CDJ-3000X/html/en/000_CDJ-3000X_IM_01_EN_DRI1956-A_en/Specifications/Specifications.htm","https://www.pioneerdj.com/en/news/2020/djm-v10-lf-6-channel-professional-dj-mixer-with-long-faders/"],"addedPlants":{"rigidPots":[{"x":0.19,"depth":0.24,"base":0,"radius":0.12,"height":0.25},{"x":0.2,"depth":0.94,"base":0.67,"radius":0.09,"height":0.16}],"note":"second pot rests on the existing cabinet footprint; flexible foliage does not block walking"},"entrance":{"state":"closed","doorObject":"Closed entrance door","width":0.8,"height":2.04,"thickness":0.04,"x":[1.16,1.96],"depthBounds":[-0.02,0.02],"heightBounds":[0.0,2.04],"handleBounds":{"x":[1.242,1.278],"depth":[-0.01,0.12],"height":[0.972,1.008]},"status":"estimated door size, closed pose verified in Blender"}};

const EPS = 1e-7;
function segmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const q = Math.max(0, Math.min(1, ((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy)));
  return Math.hypot(px-ax-q*dx, py-ay-q*dy);
}
function insidePolygon(x, y, points) {
  let inside = false;
  for (let i=0,j=points.length-1;i<points.length;j=i++) {
    const [xi,yi]=points[i], [xj,yj]=points[j];
    if ((yi>y)!==(yj>y) && x < (xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
export function curvedWallInset(height) {
  const c=DIMENSIONS.room.curve;
  if (height<=c.startHeight) return 0;
  const q=Math.min(1,(height-c.startHeight)/(c.ceilingHeight-c.startHeight));
  return c.ceilingInset*(1-Math.sqrt(Math.max(0,1-q*q)));
}
function hitsObstacle(x, depth, radius, headHeight, o) {
  if (o.height && (o.height[0]>headHeight || o.height[1]<0)) return false;
  if (o.type==='circle') return Math.hypot(x-o.centre[0],depth-o.centre[1]) < radius+o.radius-EPS;
  const nx=Math.max(o.x[0],Math.min(x,o.x[1]));
  const nd=Math.max(o.depth[0],Math.min(depth,o.depth[1]));
  return Math.hypot(x-nx,depth-nd) < radius-EPS;
}
export function pointAllowed(x, depth, radius=.20, eyeHeight=1.65, extraObstacles=[]) {
  if (![x,depth,radius,eyeHeight].every(Number.isFinite) || radius<=0) return false;
  const headHeight=eyeHeight+DIMENSIONS.navigation.headAllowance;
  if (headHeight>=DIMENSIONS.room.maxCeilingHeight) return false;
  const points=DIMENSIONS.room.floorPolygon;
  if (!insidePolygon(x,depth,points)) return false;
  // The circular footprint must fit inside the concave measured floor outline.
  for (let i=0;i<points.length;i++) {
    const a=points[i],b=points[(i+1)%points.length];
    if (segmentDistance(x,depth,a[0],a[1],b[0],b[1])<radius-EPS) return false;
  }
  // The highest part of an upright cylinder determines clearance to the curve.
  const inset=curvedWallInset(headHeight);
  if (depth<DIMENSIONS.room.curve.depthExtent+radius && x<inset+radius-EPS) return false;
  for (const obstacle of DIMENSIONS.obstacles) if (hitsObstacle(x,depth,radius,headHeight,obstacle)) return false;
  for (const obstacle of extraObstacles) if (hitsObstacle(x,depth,radius,headHeight,obstacle)) return false;
  return true;
}
export function nearestAllowedPosition(position, options={}) {
  const {radius=.20,eyeHeight=1.65,extraObstacles=[]}=options;
  const x=position.x, depth=-position.z;
  if (pointAllowed(x,depth,radius,eyeHeight,extraObstacles)) return {x,z:-depth};
  // Only used after a changed eye height or an externally supplied invalid view.
  for (let distance=.01;distance<=1.0001;distance+=.01) {
    for (let i=0;i<64;i++) {
      const angle=i*Math.PI*2/64, nx=x+Math.cos(angle)*distance, nd=depth+Math.sin(angle)*distance;
      if (pointAllowed(nx,nd,radius,eyeHeight,extraObstacles)) return {x:nx,z:-nd};
    }
  }
  const fallback=DIMENSIONS.hotspots.entrance.position;
  return {x:fallback.x,z:fallback.z};
}
function resolveObstacleContacts(x, depth, radius, eyeHeight, extraObstacles) {
  const headHeight=eyeHeight+DIMENSIONS.navigation.headAllowance;
  for (let attempt=0;attempt<6;attempt++) {
    let moved=false;
    for (const o of [...DIMENSIONS.obstacles,...extraObstacles]) {
      if (o.height && (o.height[0]>headHeight||o.height[1]<0)) continue;
      let dx,dy,limit=radius;
      if (o.type==='circle') {dx=x-o.centre[0];dy=depth-o.centre[1];limit+=o.radius;}
      else {dx=x-Math.max(o.x[0],Math.min(x,o.x[1]));dy=depth-Math.max(o.depth[0],Math.min(depth,o.depth[1]));}
      const len=Math.hypot(dx,dy);
      if (len>EPS && len<limit) {
        const push=(limit-len+EPS)/len;
        x+=dx*push;depth+=dy*push;moved=true;
      }
    }
    if (!moved) break;
  }
  return {x,depth};
}
export function moveWithCollision(position, delta, options={}) {
  const {radius=.20,eyeHeight=1.65,extraObstacles=[]}=options;
  if (![position.x,position.z,delta.x,delta.z].every(Number.isFinite)) return {...position,collided:true};
  const start=nearestAllowedPosition(position,options);
  let x=start.x,depth=-start.z,collided=x!==position.x||depth!==-position.z;
  const distance=Math.hypot(delta.x,delta.z);
  // Bounded substeps prevent tunnelling even when a tab resumes after a pause.
  const scale=distance>10?10/distance:1;
  const steps=Math.max(1,Math.ceil(Math.min(distance,10)/DIMENSIONS.navigation.maxStep));
  const dx=delta.x*scale/steps,dd=-delta.z*scale/steps;
  const allowed=(xx,yy)=>pointAllowed(xx,yy,radius,eyeHeight,extraObstacles);
  for (let i=0;i<steps;i++) {
    if (allowed(x+dx,depth+dd)) { x+=dx;depth+=dd;continue; }
    collided=true;
    // Resolve the circular body's contact with solid furniture, including
    // rounded corner motion, before falling back to room-boundary sliding.
    const resolved=resolveObstacleContacts(x+dx,depth+dd,radius,eyeHeight,extraObstacles);
    if (allowed(resolved.x,resolved.depth) && Math.hypot(resolved.x-x,resolved.depth-depth)>EPS) {
      x=resolved.x;depth=resolved.depth;continue;
    }
    // Fall back to axis sliding when simultaneous contacts leave no tangent.
    if (Math.abs(dx)>=Math.abs(dd)) {
      if (allowed(x+dx,depth)) x+=dx;
      if (allowed(x,depth+dd)) depth+=dd;
    } else {
      if (allowed(x,depth+dd)) depth+=dd;
      if (allowed(x+dx,depth)) x+=dx;
    }
  }
  return {x,z:-depth,collided};
}
