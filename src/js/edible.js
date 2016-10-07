import * as THREE from 'three';

class Edible {
  constructor(color) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geo, mat);
  }

  get position() {
    return this.mesh.position;
  }
}

export default Edible;
