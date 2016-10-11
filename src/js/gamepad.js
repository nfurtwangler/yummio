class Gamepad {
  constructor() {
    this._onGamepadConnectedHandler = (event) => {
      this._onConnectionChanged(event, true);
    };

    this._onGamepadDisconnectedHandler = (event) => {
      this._onConnectionChanged(event, false);
    };

    window.addEventListener('gamepadconnected', this._onGamepadConnectedHandler, false);
    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnectedHandler, false);

    this._movement = {
      x: 0,
      y: 0,
    };

    this._tryGetGamepad();
  }

  get movement() {
    if (this._gamepadId !== undefined) {
      return this._movement;
    }

    return undefined;
  }

  update() {
    if (this._gamepadId !== undefined) {
      const gamepads = window.navigator.getGamepads();
      for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i].id === this._gamepadId) {
          const nx = gamepads[i].axes[0];
          const ny = gamepads[i].axes[1];
          const deadzone = 0.1;
          this._movement.x = Math.abs(nx) > deadzone ? nx : 0;
          this._movement.y = Math.abs(ny) > deadzone ? ny : 0;
          break;
        }
      }
    }
  }
  dispose() {
    window.removeEventListener('gamepadconnected', this._onGamepadConnectedHandler);
    window.removeEventListener('gamepaddisconnected', this._onGamepadDisconnectedHandler);
  }
  _tryGetGamepad() {
    if (this._gamepadId === undefined) {
      const gamepads = window.navigator.getGamepads();
      for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && gamepads[i].connected) {
          this._gamepadId = gamepads[i].id;
          break;
        }
      }
    }
  }
  _onConnectionChanged(event, isConnected) {
    if (!isConnected && event.id === this._gamepadId) {
      this._gamepadId = undefined;
    }

    this._tryGetGamepad();
  }
}

export default Gamepad;
