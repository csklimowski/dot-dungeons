import { MainState } from './states/main';

var game = new Phaser.Game(640, 360, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('level-select', LevelSelectState);
game.state.add('main', MainState);

game.state.start('load');

export default game;