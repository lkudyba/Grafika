//global variables
var camera, renderer, scene;
var controls;

//scene attributes
var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
    renderer = new THREE.WebGLRenderer();
    
    scene.add(camera);
    
    camera.position.z = 300;
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1); 
    document.body.appendChild(renderer.domElement);
    
    //controls = new THREE.PointerLockControls(camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

        var vertex = geometry.vertices[ i ];
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

    }

    for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

        var face = geometry.faces[ i ];
        face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

    }

    material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

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
    
    renderer.render(scene, camera);
    //controls.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}