function loadGun(){
    // instantiate a loader
    var loader = new THREE.ObjectLoader();

    // load a resource
    loader.load(
        // resource URL
        'models/gunModel/ak-47.json',
        // Function when resource is loaded
        function ( object ) {
//            object.scale.set(0.1, 0.1, 0.1);
            object.position.set(10, -5, -10);
            object.rotateY(9);
            camera.add(object);
        }
    );
}

function addCrossFire(){
    var crossGeom = new THREE.CircleGeometry( 0.01, 32 );
    var crossMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    var cross = new THREE.Mesh(crossGeom, crossMaterial);
    cross.position.z = -2;
    camera.add(cross);
}