import * as THREE from 'three';

class Edible {
  constructor(color) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geo, mat);

    this.scaleAnimDuration = 250;
    this.size = 1;
  }

  get position() {
    return this.mesh.position;
  }

  get size() {
    return this.destScale;
  }
  set size(value) {
    this.fromScale = this.mesh.scale.x;
    this.destScale = value;
    this.scaleAnimRemainingMs = this.scaleAnimDuration;
  }

  update(timeMs) {
    const dtMs = timeMs - (this.lastTimeMs || timeMs);
    this.lastTimeMs = timeMs;

    if (this.scaleAnimRemainingMs > 0) {
      this.scaleAnimRemainingMs = Math.max(0, this.scaleAnimRemainingMs - dtMs);
      const newScale = ((this.destScale * (this.scaleAnimDuration - this.scaleAnimRemainingMs)) +
                        (this.fromScale * this.scaleAnimRemainingMs)) / this.scaleAnimDuration;

      this.mesh.scale.x = newScale;
      this.mesh.scale.y = newScale;
      this.mesh.scale.z = newScale;
    }
  }

  containsPoint(pointWorldCoords) {
    // Just check x and z being within the scaled 2D bounds of the bottom face
    const pos = this.position;
    const halfsize = this.size / 2;
    return pointWorldCoords.x >= pos.x - halfsize &&
           pointWorldCoords.x <= pos.x + halfsize &&
           pointWorldCoords.z >= pos.z - halfsize &&
           pointWorldCoords.z <= pos.z + halfsize;
  }
}

export default Edible;
