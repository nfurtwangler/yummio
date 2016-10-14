import * as THREE from 'three';

class MainMenuScene {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.lookAt(new THREE.Vector3(0, -1, 0));
    this.camera.position.y = 500;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    const himisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.75);
    this.scene.add(ambientLight);
    this.scene.add(himisphereLight);

    const titleWidth = 256;
    const titleHeight = 64;

    const canvas = window.document.createElement('canvas');
    canvas.width = titleWidth;
    canvas.height = titleHeight;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, titleWidth, titleHeight);
    context.font = '40px Helvetica';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
    context.fillText('Yummio', 0, titleHeight / 2);

    const textGeo = new THREE.PlaneGeometry(titleWidth, titleHeight);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    const textMat = new THREE.MeshBasicMaterial({
      map: canvasTexture,
      transparent: true,
    });
    this.titleText = new THREE.Mesh(textGeo, textMat);
    this.titleText.rotation.x = -Math.PI / 2;
    this.titleText.position.x = 64;
    this.titleText.position.z = -200;
    this.scene.add(this.titleText);

    this.fadeAnimationDurationMs = 2000;
    this.fadeAnimationRemainingMs = this.fadeAnimationDurationMs;
  }

  update(timeMs) {
    const dtMs = timeMs - (this.lastTimeMs || timeMs);
    this.lastTimeMs = timeMs;

    if (this.fadeAnimationRemainingMs > 0) {
      this.fadeAnimationRemainingMs -= dtMs;
      this.titleText.material.opacity = Math.max(0,
                                                 (this.fadeAnimationRemainingMs /
                                                  this.fadeAnimationDurationMs));
    }
  }
  draw(renderer) {
    renderer.render(this.scene, this.camera);
  }
}

export default MainMenuScene;
