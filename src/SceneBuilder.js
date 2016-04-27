//global variables
var camera, renderer, scene;
var controls,time = Date.now();
var ray;

//scene attributes
var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    
    scene.add(camera);
    
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000); 
    document.body.appendChild(renderer.domElement);
    
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    
    ray = new THREE.Raycaster();
    ray.ray.direction.set( 0, -1, 0 );
    
    geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    var texture = THREE.ImageUtils.loadTexture("textures/floor-wood.jpg")

    material = new THREE.MeshPhongMaterial();
    material.map = texture;
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
    
    window.addEventListener("resize", onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    
    controls.isOnObject( true );

    ray.ray.origin.copy( controls.getObject().position );
    ray.ray.origin.y -= 10;


    controls.update( Date.now() - time );
    
    renderer.render(scene, camera);
    
    time = Date.now();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}