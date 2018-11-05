import { LoadState } from './states/load';
import { MenuState } from './states/menu';
import { MainState } from './states/main';
import { ResultsState } from './states/results';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('main', MainState);
game.state.add('results', ResultsState);

game.state.start('load');

export default game;