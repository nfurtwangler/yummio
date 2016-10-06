import * as THREE from 'three';
import '../css/app.css';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function render() {
  window.requestAnimationFrame(render);

  // Should be time dependent not frame dependent but who cares this is a demo
  cube.rotation.x += 0.1 * (60 / 165);
  cube.rotation.y += 0.1 * (60 / 165);

  renderer.render(scene, camera);
}
render();
