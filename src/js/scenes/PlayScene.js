import * as THREE from 'three';

import Edible from '../Edible';
import PlayerController from '../PlayerController';

import grassUrl from '../../images/grass.jpg';

class PlayScene {
  constructor(width, height, keyboard, gamepad) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.lookAt(new THREE.Vector3(0, -1, -0.25));
    this.camera.position.z = 10;
    this.camera.position.y = 30;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    const himisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.75);
    this.scene.add(ambientLight);
    this.scene.add(himisphereLight);

    this.boardSize = {
      x: 400,
      z: 400,
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      './' + grassUrl,
      (texture) => {
        const groundGeo = new THREE.PlaneGeometry(this.boardSize.x, this.boardSize.z);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 8);
        const groundMat = new THREE.MeshStandardMaterial({ map: texture });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
      }
    );

    const initialEdibleCount = 200;
    this.edibles = [];
    for (let i = 0; i < initialEdibleCount; i++) {
      const rx = (Math.random() - 0.5) * this.boardSize.x;
      const rz = (Math.random() - 0.5) * this.boardSize.z;
      const rc = Math.random() * 0xFFFFFF;
      this.addEdible(rx, 0, rz, rc);
    }

    this.player = this.addEdible(0, 0, 0, 0xFFFFFF);
    this.player.energy = 2;
    this.player.mesh.add(this.camera);

    this.playerController = new PlayerController(
      this.player,
      keyboard,
      gamepad,
      this.boardSize,
    );
  }

  update(timeMs) {
    this.playerController.update(timeMs);
    this.eatEdibles();

    for (let i = this.edibles.length - 1; i >= 0; i--) {
      this.edibles[i].update(timeMs);
    }
  }
  draw(renderer) {
    renderer.render(this.scene, this.camera);
  }
  eatEdibles() {
    for (let i = this.edibles.length - 1; i >= 0; i--) {
      const edible = this.edibles[i];
      if (this.player !== edible &&
          this.player.containsPoint(edible.position) &&
          this.player.energy > edible.energy) {
        this.player.energy += edible.energy;
        this.removeEdible(edible);
      }
      // TODO: else handle player possibly being eaten by another edible
    }
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
}

export default PlayScene;
