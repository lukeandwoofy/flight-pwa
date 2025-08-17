import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.156.0/examples/jsm/loaders/GLTFLoader.js';

const canvas   = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene    = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera   = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 8);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const loader = new GLTFLoader();
let plane, map;

// Load the airplane model
loader.load('assets/plane.glb',
  gltf => {
    plane = gltf.scene;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
  },
  undefined,
  error => console.error('Plane load error:', error)
);

// Load the map model
loader.load('assets/map.glb',
  gltf => {
    map = gltf.scene;
    scene.add(map);
  },
  undefined,
  error => console.error('Map load error:', error)
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (plane) plane.rotation.z += 0.002;
  renderer.render(scene, camera);
}
animate();

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .catch(err => console.error('SW registration failed:', err));
}
