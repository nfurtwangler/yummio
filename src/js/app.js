import Game from './game';

import '../css/app.css';

const game = new Game(window.innerWidth, window.innerHeight);

window.document.body.appendChild(game.domElement);

function render() {
  window.requestAnimationFrame(render);

  game.update(window.performance.now());
  game.draw();
}

render();
