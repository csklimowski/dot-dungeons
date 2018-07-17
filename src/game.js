import { LoadState } from './states/load';
import { MenuState } from './states/menu';
import { MainState } from './states/main';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('main', MainState);

game.state.start('load');

export default game;