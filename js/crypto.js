//
// #CryptoCube Web Application
// Nate Koenig, May 18
//
// Crypto data taken from google finance at: 


// ------------------------- BEGIN SETUP ------------------------- \\

// API info
var wrapAPIKey = "put your key here";


// Global variables
var ETHCube, BTCCube, DOGECube, scene, camera, renderer, ETH, ETHColor, BTC, BTCColor, DOGE, DOGEColor;


// Create scene, camera, and renderer
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
var faceSize = 1.5;

// Set rendering
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.update();

// ------------------------- END SETUP ------------------------- \\

// Fetch price of ETH
function fetchETH() {
	$.ajax({
		url: "https://wrapapi.com/use/nako48/eth/price/0.0.1",
		method: "POST",
		data: {
			"wrapAPIKey": wrapAPIKey
		}
	}).done(function(data) {
		if (data.success) {
			ETH = data["data"]["output"][0];

			//if - in front, then red, otherwise green
			if (ETH.charAt(0) == '-') {
				ETHColor = "red";
			}
			else {
				ETHColor = "green";
			}
		}
	});
}

// Fetch price of BTC
function fetchBTC() {
	$.ajax({
		url: "https://wrapapi.com/use/nako48/bitcoin/price/0.0.1",
		method: "POST",
		data: {
			"wrapAPIKey": wrapAPIKey
		}
	}).done(function(data) {
		if (data.success) {
			BTC = data["data"]["output"][0];

			//if - in front, then red, otherwise green
			if (BTC.charAt(0) == '-') {
				BTCColor = "red";
			}
			else {
				BTCColor = "green";
			}
		}
	});
}

// Fetch price of DOGE
function fetchDOGE() {
	$.ajax({
		url: "https://wrapapi.com/use/nako48/doge/price/0.0.1",
		method: "POST",
		data: {
			"wrapAPIKey": wrapAPIKey
		}
	}).done(function(data) {
		if (data.success) {
			DOGE = data["data"]["output"][0];

			//if - in front, then red, otherwise green
			if (DOGE.charAt(0) == '-') {
				DOGEColor = "red";
			}
			else {
				DOGEColor = "green";
			}
		}
	});
}

// Generate cube
function createCubes() {
	//make cubes
	var ETHGeometry = new THREE.BoxGeometry( faceSize, faceSize, faceSize );
	var ETHMaterial;
	var BTCGeometry = new THREE.BoxGeometry( faceSize, faceSize, faceSize );
	var BTCMaterial;
	var DOGEGeometry = new THREE.BoxGeometry( faceSize, faceSize, faceSize );
	var DOGEMaterial;

	ETHGeometry.colorsNeedUpdate = true;
	BTCGeometry.colorsNeedUpdate = true;
	DOGEGeometry.colorsNeedUpdate = true;


	if (ETHColor == "green") {
		ETHMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	}
	else {
		ETHMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	}

	if (BTCColor == "green") {
		BTCMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	}
	else {
		BTCMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	}

	if (DOGEColor == "green") {
		DOGEMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	}
	else {
		DOGEMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	}

    
	ETHCube = new THREE.Mesh( ETHGeometry, ETHMaterial );
	BTCCube = new THREE.Mesh( BTCGeometry, BTCMaterial );
	DOGECube = new THREE.Mesh( DOGEGeometry, DOGEMaterial );

	ETHCube.position.set( 0, 0, 0 );
	BTCCube.position.set( -5, 0, 0 );
	DOGECube.position.set( 5, 0, 0 );

	//add to scene
	scene.add( ETHCube, BTCCube, DOGECube );
}


// Generate animation
function animate() {
	requestAnimationFrame( animate );

	ETHCube.rotation.x += 0.01;
	ETHCube.rotation.y += 0.01;
	BTCCube.rotation.x += 0.01
	BTCCube.rotation.y += 0.01;
	DOGECube.rotation.x += 0.01;
	DOGECube.rotation.y += 0.01;

	renderer.render ( scene, camera );
}

// Driver
function init() {
	//get cryptos
	fetchETH();
	fetchBTC();
	fetchDOGE();

	//create the cube
	createCubes();


	//create the animation
	animate();
}


init();
