//
// #CryptoCube Web Application
// Nate Koenig, May 18
//
// Crypto data taken from google finance at: 


// ------------------------- BEGIN SETUP ------------------------- \\

// API info
var wrapAPIKey = "your key goes here";


// Global variables
var cube, scene, camera, renderer, ETH, ETHColor, BTC, BTCColor, DOGE, DOGEColor;


// Create scene, camera, and renderer
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
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
			ETH = data["data"]["output"];

			//if - in front, then red, otherwise green
			if (ETH.charAt(0) == '-') {
				ETHColor = 0xff0000;
			}
			else {
				ETHColor = 0x00ff00;
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
			BTC = data["data"]["output"];

			//if - in front, then red, otherwise green
			if (BTC.charAt(0) == '-') {
				BTCColor = 0xff0000;
			}
			else {
				BTCColor = 0x00ff00;
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
			DOGE = data["data"]["output"];

			//if - in front, then red, otherwise green
			if (DOGE.charAt(0) == '-') {
				DOGEColor = 0xff0000;
			}
			else {
				DOGEColor = 0x00ff00;
			}
		}
	});
}

// Generate cube
function createCube() {
	//make cube
	var cubeGeometry = new THREE.BoxGeometry( faceSize, faceSize, faceSize );
	cubeGeometry.colorsNeedUpdate = true;

	cubeGeometry.faces[ 0 ].color.setHex( ETHColor ); //face 1: ETH
    cubeGeometry.faces[ 1 ].color.setHex( BTCColor ); //face 2: BTC
    cubeGeometry.faces[ 2 ].color.setHex( DOGEColor ); //face 3: DOGE
    //cubeGeometry.faces[ 3 ].color.setHex( Math.random() * 0xffffff );
    //cubeGeometry.faces[ 4 ].color.setHex( Math.random() * 0xffffff );
    //cubeGeometry.faces[ 5 ].color.setHex( Math.random() * 0xffffff );

	var cubeMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );


	//add to scene
	cube.position.set( 0, 0, 0 );
	scene.add( cube );
}

// Generate animation
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render ( scene, camera );
}

// Driver
function init() {
	//get cryptos
	fetchETH();
	fetchBTC();
	fetchDOGE();

	//create the cube
	createCube();

	//create the animation
	animate();
}


init();
