import * as THREE from 'three';

import Keyboard from './keyboard';
import Gamepad from './gamepad';
import PlayScene from './playscene';

class Game {
  constructor(width, height) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.keyboard = new Keyboard();
    this.gamepad = new Gamepad();

    this.scene = new PlayScene(width, height, this.keyboard, this.gamepad);
  }

  get domElement() {
    return this.renderer.domElement;
  }

  update(timeMs) {
    this.gamepad.update();
    this.scene.update(timeMs);
  }
  draw() {
    this.scene.draw(this.renderer);
  }
  dispose() {
    this.keyboard.dispose();
    this.gamepad.dispose();
  }
}

export default Game;
