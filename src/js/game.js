import * as THREE from 'three';
import orbitControlsDef from 'three-orbit-controls';

import Edible from './edible';

const OrbitControls = orbitControlsDef(THREE);

class Game {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    const himisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.75);
    this.scene.add(ambientLight);
    this.scene.add(himisphereLight);

    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.minDistance = 10;
    this.controls.maxDistance = 300;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2.5;
    this.setInitialCameraPos = false;

    const boardX = 400;
    const boardY = 400;
    const groundGeo = new THREE.PlaneGeometry(boardX, boardY);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x00CC1F });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.5;
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    const initialEdibleCount = 50;
    for (let i = 0; i < initialEdibleCount; i++) {
      const rx = (Math.random() - 0.5) * boardX;
      const rz = (Math.random() - 0.5) * boardY;
      this.addEdible(rx, 0, rz);
    }
  }

  get domElement() {
    return this.renderer.domElement;
  }

  update() {
    if (this.setInitialCameraPos === false) {
      this.setInitialCameraPosition();
    } else {
      this.controls.update();
    }
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
  }
  setInitialCameraPosition() {
    this.setInitialCameraPos = true;
    const minDistance = this.controls.minDistance;
    const maxDistance = this.controls.maxDistance;
    const minPolarAngle = this.controls.minPolarAngle;
    const maxPolarAngle = this.controls.maxPolarAngle;
    this.controls.minDistance = 100;
    this.controls.maxDistance = this.controls.minDistance;
    this.controls.minPolarAngle = Math.PI / 3;
    this.controls.maxPolarAngle = this.controls.minPolarAngle;
    this.controls.update();
    this.controls.minDistance = minDistance;
    this.controls.maxDistance = maxDistance;
    this.controls.minPolarAngle = minPolarAngle;
    this.controls.maxPolarAngle = maxPolarAngle;
  }
  addEdible(x, y, z) {
    const color = Math.random() * 0xFFFFFF;
    const edible = new Edible(color);
    edible.position.x = x;
    edible.position.y = y;
    edible.position.z = z;

    this.scene.add(edible.mesh);
  }
}

export default Game;
