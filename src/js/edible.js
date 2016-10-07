import * as THREE from 'three';

class Edible {
  constructor(color) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geo, mat);

    this.energy = 1;
  }

  get position() {
    return this.mesh.position;
  }

  get energy() {
    return this.mesh.scale.x;
  }
  set energy(value) {
    this.mesh.scale.x = value;
    this.mesh.scale.y = value;
    this.mesh.scale.z = value;
  }

  containsPoint(pointWorldCoords) {
    // Just check x and z being within the scaled 2D bounds of the bottom face
    const pos = this.position;
    const halfsize = this.mesh.scale.x / 2;
    return pointWorldCoords.x >= pos.x - halfsize &&
           pointWorldCoords.x <= pos.x + halfsize &&
           pointWorldCoords.z >= pos.z - halfsize &&
           pointWorldCoords.z <= pos.z + halfsize;
  }
}

export default Edible;
