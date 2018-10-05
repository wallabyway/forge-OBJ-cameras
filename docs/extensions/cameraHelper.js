// cameraHelper.js
// requires transform controls.

var linemat = new THREE.LineBasicMaterial( { color: 0xff00ff } );

THREE.cameraHelper = function ( viewState, obj ) {
	var cam = obj.clone();
	var p = viewState.viewport.eye;
	var t = viewState.viewport.target;
	cam.position.set( p[0], p[1], p[2]);
	cam.lookAt(new THREE.Vector3( t[0], t[1], t[2] ));
	cam.scale.set(0.1,0.1,0.1);

	// Add laser pointer
	var linegeom = new THREE.Geometry();
	linegeom.vertices.push(new THREE.Vector3( 0, 0, 0) );
	linegeom.vertices.push(new THREE.Vector3( 0, 1000, 0) );
	var line = new THREE.Line( linegeom, linemat );
	cam.add(line);

	return cam;
}
