import { LoadState } from './states/load';
import { LevelSelectState } from './states/levelSelect';
import { MainState } from './states/main';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('level-select', LevelSelectState);
game.state.add('main', MainState);

game.state.start('load');

export default game;