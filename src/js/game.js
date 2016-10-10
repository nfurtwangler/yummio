import * as THREE from 'three';
import orbitControlsDef from 'three-orbit-controls';

import Edible from './edible';
import Keyboard from './keyboard';

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

    this.cameraControls = new OrbitControls(this.camera, this.domElement);
    this.cameraControls.minDistance = 10;
    this.cameraControls.maxDistance = 300;
    this.cameraControls.minPolarAngle = 0;
    this.cameraControls.maxPolarAngle = Math.PI / 2.5;
    this.setInitialCameraPos = false;

    this.keyboard = new Keyboard(this.domElement);

    this.boardSize = {
      x: 400,
      z: 400,
    };
    const groundGeo = new THREE.PlaneGeometry(this.boardSize.x, this.boardSize.z);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x00CC1F });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    const initialEdibleCount = 50;
    this.edibles = [];
    for (let i = 0; i < initialEdibleCount; i++) {
      const rx = (Math.random() - 0.5) * this.boardSize.x;
      const rz = (Math.random() - 0.5) * this.boardSize.z;
      const rc = Math.random() * 0xFFFFFF;
      this.addEdible(rx, 0, rz, rc);
    }

    this.player = this.addEdible(0, 0, 0, 0xFFFFFF);
    this.player.size = 2;
  }

  get domElement() {
    return this.renderer.domElement;
  }

  update(timeMs) {
    const dtMs = timeMs - (this.lastTimeMs || timeMs);
    this.lastTimeMs = timeMs;

    if (this.setInitialCameraPos === false) {
      this.setInitialCameraPosition();
    } else {
      this.handleInput(dtMs);
      this.eatEdibles();
      this.cameraControls.update();

      for (let i = this.edibles.length - 1; i >= 0; i--) {
        this.edibles[i].update(timeMs);
      }
    }
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
  }
  handleInput(dtMs) {
    let dx = 0;
    let dz = 0;
    const distPerSec = 30;
    const dist = distPerSec * (dtMs / 1000);
    if (this.keyboard.isKeyPressed('w')) {
      dz = -dist;
    }
    if (this.keyboard.isKeyPressed('s')) {
      dz = dist;
    }
    if (this.keyboard.isKeyPressed('a')) {
      dx = -dist;
    }
    if (this.keyboard.isKeyPressed('d')) {
      dx = dist;
    }

    // Update player position
    const nx = this.player.position.x + dx;
    const nz = this.player.position.z + dz;
    const playerHalfSize = this.player.size / 2;
    this.player.position.x = Math.max(playerHalfSize - (this.boardSize.x / 2),
                                      Math.min(nx, (this.boardSize.x / 2) - playerHalfSize));
    this.player.position.z = Math.max(playerHalfSize - (this.boardSize.z / 2),
                                      Math.min(nz, (this.boardSize.z / 2) - playerHalfSize));
  }
  eatEdibles() {
    for (let i = this.edibles.length - 1; i >= 0; i--) {
      const edible = this.edibles[i];
      if (this.player !== edible &&
          this.player.containsPoint(edible.position) &&
          this.player.size > edible.size) {
        this.player.size += edible.size;
        this.removeEdible(edible);
      }
      // TODO: else handle player possibly being eaten by another edible
    }
  }
  setInitialCameraPosition() {
    this.setInitialCameraPos = true;
    const minDistance = this.cameraControls.minDistance;
    const maxDistance = this.cameraControls.maxDistance;
    const minPolarAngle = this.cameraControls.minPolarAngle;
    const maxPolarAngle = this.cameraControls.maxPolarAngle;
    this.cameraControls.minDistance = 100;
    this.cameraControls.maxDistance = this.cameraControls.minDistance;
    this.cameraControls.minPolarAngle = Math.PI / 3;
    this.cameraControls.maxPolarAngle = this.cameraControls.minPolarAngle;
    this.cameraControls.update();
    this.cameraControls.minDistance = minDistance;
    this.cameraControls.maxDistance = maxDistance;
    this.cameraControls.minPolarAngle = minPolarAngle;
    this.cameraControls.maxPolarAngle = maxPolarAngle;
  }
  addEdible(x, y, z, color) {
    const edible = new Edible(color);
    edible.position.x = x;
    edible.position.y = y;
    edible.position.z = z;

    this.scene.add(edible.mesh);
    this.edibles.push(edible);

    return edible;
  }
  removeEdible(edible) {
    this.scene.remove(edible.mesh);
    this.edibles.splice(this.edibles.indexOf(edible), 1);
  }
  dispose() {
    this.keyboard.dispose();
    this.cameraControls.dispose();
  }
}

export default Game;
