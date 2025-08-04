// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls for camera manipulation (User Story 3.1)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 20; // Prevents zooming in too close
controls.maxDistance = 300; // Prevents zooming out too far
controls.enableDamping = true; // Smooths out the camera movement
controls.dampingFactor = 0.05;

// Create a starfield
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add Lighting (User Story 4.1)
const ambientLight = new THREE.AmbientLight(0x333333); // Soft ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 600); // Bright point light from the sun
scene.add(pointLight);

// Create Sun (User Story 2.1)
const sunGeometry = new THREE.SphereGeometry(2.5, 32, 32); // Increased size for better visibility
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Sun is a basic material as it emits light
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets Data (User Story 2.2 & 4.1 - Speed Adjustments)
const planetsData = [
    { name: '水星', radius: 0.3, distance: 8, color: 0xaaaaaa, revolutionSpeed: 0.008, rotationSpeed: 0.01, diameter: '4,879 km', mass: '0.055 地球质量', avgDist: '5790万公里' },
    { name: '金星', radius: 0.6, distance: 12, color: 0xffa500, revolutionSpeed: 0.006, rotationSpeed: 0.005, diameter: '12,104 km', mass: '0.815 地球质量', avgDist: '1.082亿公里' },
    { name: '地球', radius: 0.7, distance: 18, color: 0x0077ff, revolutionSpeed: 0.004, rotationSpeed: 0.02, diameter: '12,742 km', mass: '1 地球质量', avgDist: '1.496亿公里' },
    { name: '火星', radius: 0.4, distance: 25, color: 0xff4500, revolutionSpeed: 0.003, rotationSpeed: 0.018, diameter: '6,779 km', mass: '0.107 地球质量', avgDist: '2.279亿公里' },
    { name: '木星', radius: 1.8, distance: 38, color: 0xffd700, revolutionSpeed: 0.0015, rotationSpeed: 0.04, diameter: '139,820 km', mass: '317.8 地球质量', avgDist: '7.785亿公里' },
    { name: '土星', radius: 1.5, distance: 55, color: 0xf0e68c, revolutionSpeed: 0.0009, rotationSpeed: 0.035, diameter: '116,460 km', mass: '95.2 地球质量', avgDist: '14亿公里' },
    { name: '天王星', radius: 1.1, distance: 70, color: 0xadd8e6, revolutionSpeed: 0.0006, rotationSpeed: 0.025, diameter: '50,724 km', mass: '14.5 地球质量', avgDist: '29亿公里' },
    { name: '海王星', radius: 1.0, distance: 85, color: 0x00008b, revolutionSpeed: 0.0004, rotationSpeed: 0.022, diameter: '49,244 km', mass: '17.1 地球质量', avgDist: '45亿公里' }
];

const planetMeshes = [];

planetsData.forEach(planetData => {
   // Create planet mesh (User Story 4.1 - Material Change)
   const planetGeometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
   const planetMaterial = new THREE.MeshStandardMaterial({ color: planetData.color, metalness: 0.3, roughness: 0.7 });
   const planet = new THREE.Mesh(planetGeometry, planetMaterial);
   planet.userData = planetData; // Store all data on the mesh

   // Create a pivot point for the planet's revolution (User Story 2.3)
   const pivot = new THREE.Object3D();
   scene.add(pivot);
   pivot.add(planet);

   // Position the planet according to its distance from the sun
   planet.position.x = planetData.distance;

   planetMeshes.push({
       planet: planet,
       pivot: pivot,
       revolutionSpeed: planetData.revolutionSpeed,
       rotationSpeed: planetData.rotationSpeed // (User Story 2.4)
   });
});

// Camera position
camera.position.set(0, 40, 90);
camera.lookAt(scene.position);

// Animation loop
// The animate function is now defined below, after the interaction logic

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Raycasting for mouse interaction (User Story 3.2)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
    const audio = document.querySelector('audio');
    audio.muted = false;
    audio.play();

    // Check if the click was on an intersected object
    if (intersectedObject) {
        const data = intersectedObject.userData;
        document.getElementById('planet-name').textContent = data.name;
        document.getElementById('planet-diameter').textContent = data.diameter;
        document.getElementById('planet-mass').textContent = data.mass;
        document.getElementById('planet-distance').textContent = data.avgDist;
        document.getElementById('info-card').classList.remove('hidden');
    }
}

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-card').classList.add('hidden');
});

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onClick, false);

animate();

// Modify the animate function to include raycasting
function animate() {
    requestAnimationFrame(animate);

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.planet));

    if (intersects.length > 0) {
        if (intersectedObject !== intersects[0].object) {
            // Restore previous object's material if there was one
            if (intersectedObject) {
                intersectedObject.material.emissive.setHex(0x000000);
            }
            intersectedObject = intersects[0].object;
            // Highlight the new object
            intersectedObject.material.emissive.setHex(0x555555);
        }
    } else {
        // Restore previous object's material if there was one
        if (intersectedObject) {
            intersectedObject.material.emissive.setHex(0x000000);
        }
        intersectedObject = null;
    }

    // Rotate stars for a dynamic effect
    stars.rotation.x += 0.0001;
    stars.rotation.y += 0.0001;

    // Sun self-rotation
    sun.rotation.y += 0.001;

    // Animate planets: revolution and rotation (User Story 2.3 & 2.4)
    planetMeshes.forEach(p => {
        p.pivot.rotation.y += p.revolutionSpeed; // Revolution around the sun
        p.planet.rotation.y += p.rotationSpeed; // Self-rotation
    });

    controls.update(); // Required for damping to work
    renderer.render(scene, camera);
}
