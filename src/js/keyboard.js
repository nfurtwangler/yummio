class Keyboard {
  constructor() {
    this.onKeyDownHandler = (event) => {
      this.onKeyChange(event, true);
    };

    this.onKeyUpHandler = (event) => {
      this.onKeyChange(event, false);
    };

    window.addEventListener('keydown', this.onKeyDownHandler, false);
    window.addEventListener('keyup', this.onKeyUpHandler, false);

    this.keyCodes = {};
    this.keyNameMap = {
      w: 87,
      s: 83,
      a: 65,
      d: 68,
    };
  }

  isKeyPressed(keyName) {
    return this.keyCodes[this.keyNameMap[keyName]] === true;
  }
  onKeyChange(event, isPressed) {
    this.keyCodes[event.keyCode] = isPressed;
  }
  dispose() {
    window.removeEventListener('keydown', this.onKeyDownHandler);
    window.removeEventListener('keyup', this.onKeyUpHandler);
  }
}

export default Keyboard;
