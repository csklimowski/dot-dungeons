import MainState from './states/main';

var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game');

game.state.add('main', MainState);

game.state.start('main');

export default game;