import * as THREE from 'three';

class MainMenuScene {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.lookAt(new THREE.Vector3(0, -1, -0.25));
    this.camera.position.z = 10;
    this.camera.position.y = 30;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    const himisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.75);
    this.scene.add(ambientLight);
    this.scene.add(himisphereLight);
  }

  update() {
    // do nothing.
  }
  draw(renderer) {
    renderer.render(this.scene, this.camera);
  }
}

export default MainMenuScene;
