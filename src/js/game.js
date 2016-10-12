import * as THREE from 'three';

import Keyboard from './keyboard';
import Gamepad from './gamepad';
import PlayScene from './playscene';
import MainMenuScene from './mainmenuscene';

class Game {
  constructor(width, height) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.autoClear = false;

    this.keyboard = new Keyboard();
    this.gamepad = new Gamepad();

    this.playScene = new PlayScene(width, height, this.keyboard, this.gamepad);
    this.mainMenuScene = new MainMenuScene(width, height);
  }

  get domElement() {
    return this.renderer.domElement;
  }

  update(timeMs) {
    this.gamepad.update();
    this.playScene.update(timeMs);
  }
  draw() {
    this.renderer.clear();

    this.playScene.draw(this.renderer);
    this.mainMenuScene.draw(this.renderer);
  }
  dispose() {
    this.keyboard.dispose();
    this.gamepad.dispose();
  }
}

export default Game;
