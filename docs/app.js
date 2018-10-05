let inSVF = window.location.search;
let viewer;

var viewStates = [
	{"viewport":{"name":"","eye":[63.4573315717432,54.00539656374525,0.3954041272863],"target":[-182.44454194347043,-270.9675826967336,-373.32406499505953],"up":[-0.2483724861641897,0.8485857169975204,-0.4671331598424841],"worldUpVector":[0,1,0],"pivotPoint":[37.81322646507962,43.88141314081513,40.03438798259458],"distanceToOrbit":806.276539067982,"aspectRatio":1.902061855670103,"projection":"perspective","isOrthographic":false,"fieldOfView":22.918312146742387}},
	{"viewport":{"name":"","eye":[9.97230916985185,68.8908329153263, 0.01029576775429],"target":[81.51428263715795,-753.2667313893775,239.58144614031337],"up":[-0.04946167020653998,0.2627619643160633,0.963592078261929],"worldUpVector":[0,1,0],"pivotPoint":[48.193467686450305,18.558605555111114,11.800714547187397],"distanceToOrbit":566.2807733860644,"aspectRatio":1.902061855670103,"projection":"perspective","isOrthographic":false,"fieldOfView":22.918312146742387}},
	{"viewport":{"name":"","eye":[-24.2691476449123,42.6505164276925, 0.13303803246106],"target":[268.0259078155068,-460.8007897974295,-346.6149756761407],"up":[0.5432521913940823,0.6810027141839978,-0.4910319336046847],"worldUpVector":[0,1,0],"pivotPoint":[24.323528772924313,57.16362725342778,128.62718425779093],"distanceToOrbit":650.8747272159101,"aspectRatio":1.902061855670103,"projection":"perspective","isOrthographic":false,"fieldOfView":22.918312146742387}},
]


function initializeViewer(scene) {
	const camObjs = [];
	const div = document.getElementById('forgeViewer');


	function initOBJs(scene) {
	    scene.add(new THREE.AmbientLight('#777', 0.2));
	    let light = new THREE.PointLight( 0xffffff, 0.8 );
	    light.position.set(10, 10, 10);
	    scene.add( light );

	    // Load the OBJ and add to scene
	    let objLoader = new THREE.OBJLoader();
        objLoader.load('extensions/rift.obj', objMesh => {
	        viewStates.map( viewState => {
	        		var cam = new THREE.cameraHelper( viewState, objMesh );
		        	scene.add(cam);
		        	camObjs.push(cam);
	        });
    	});

    	control = new THREE.TransformControls(viewer.getCamera().perspectiveCamera, document.getElementsByClassName("adsk-viewing-viewer")[0]);
        div.addEventListener("click", e=> {
        	control.attach(camObjs[Math.round(Math.random()*2)]);
        	control.update();
        	viewer.impl.invalidate(true);
         });
    	scene.add(control);
        control.addEventListener('change', i=>console.log(i));
	}

	var options = {
	  env: "Local",
	  useADP: false,
	  useConsolidation: true,
	  urn: "https://lmv-models.s3.amazonaws.com/House_Design/output/Resource/3D_View/_3D_/_3D_.svf"//(inSVF.length>0) ? inSVF.split("=")[1] : "https://lmv.rocks/data/house2/0.svf"
	}
	window.devicePixelRatio = 1.25;
	viewer = new Autodesk.Viewing.Private.GuiViewer3D(div, {});
	Autodesk.Viewing.Initializer( options, function() {
	  viewer.start(options.urn, options, onSuccess);
	});
	function onSuccess() {
		initOBJs(viewer.impl.scene);//'myOverlay');
	}

}




