import * as THREE from 'three';

class PlayerController {
  constructor(player, keyboard, gamepad, boardSize) {
    this.player = player;
    this.keyboard = keyboard;
    this.gamepad = gamepad;
    this.boardSize = boardSize;

    this.acceleration = new THREE.Vector2(0, 0);
  }
  update(timeMs) {
    const dtMs = timeMs - (this.lastTimeMs || timeMs);
    this.lastTimeMs = timeMs;

    let dx = 0;
    let dz = 0;
    if (this.keyboard.isKeyPressed('w')) {
      dz += -1;
    }
    if (this.keyboard.isKeyPressed('s')) {
      dz += 1;
    }
    if (this.keyboard.isKeyPressed('a')) {
      dx += -1;
    }
    if (this.keyboard.isKeyPressed('d')) {
      dx += 1;
    }

    const gamepadMovement = this.gamepad.movement;
    if (gamepadMovement !== undefined) {
      dx += gamepadMovement.x;
      dz += gamepadMovement.y;
    }

    const maxDistPerSec = 30;
    const maxDist = maxDistPerSec * (dtMs / 1000);
    this.acceleration.set(dx * maxDist, dz * maxDist);
    this.acceleration.setLength(Math.min(maxDist, this.acceleration.length()));

    // Move player
    const nx = this.player.position.x + this.acceleration.x;
    const nz = this.player.position.z + this.acceleration.y;

    // Clamp to board
    const playerHalfSize = Math.cbrt(this.player.energy) / 2;
    this.player.position.x = Math.max(playerHalfSize - (this.boardSize.x / 2),
                                      Math.min(nx, (this.boardSize.x / 2) - playerHalfSize));
    this.player.position.z = Math.max(playerHalfSize - (this.boardSize.z / 2),
                                      Math.min(nz, (this.boardSize.z / 2) - playerHalfSize));
  }
}

export default PlayerController;
