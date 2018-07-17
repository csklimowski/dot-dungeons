import game from '../game';

export class LoadState extends Phaser.State {
	preload() {
		game.add.text(game.width/2, game.height/2, 'Loading...', { font: '30px sans-serif', fill: '#ffffff', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

		game.load.bitmapFont('handwritten', 'font/font2.png', 'font/font2.fnt');
		game.load.spritesheet('level-button', 'img/level-button.png', 32, 32);
		game.load.spritesheet('dot', 'img/dot.png', 20, 20);
		game.load.spritesheet('one', 'img/one.png', 80, 80);
		game.load.spritesheet('two', 'img/two.png', 80, 80);
		game.load.spritesheet('three', 'img/three.png', 80, 80);
		game.load.spritesheet('number', 'img/number.png', 40, 40);
		game.load.spritesheet('door', 'img/door.png', 110, 110);
		game.load.spritesheet('ui', 'img/ui.png', 32, 32);
		game.load.spritesheet('charge', 'img/charge.png', 60, 60);
		game.load.spritesheet('starburst', 'img/starburst.png', 130, 130);
		game.load.image('paper-texture', 'img/paper-texture.png');
		game.load.image('level-popup', 'img/level-popup.png');
		game.load.image('pencil', 'img/pencil.png');
		game.load.image('puzzles', 'img/menu/puzzles.png');
		game.load.image('arrow', 'img/menu/arrow.png');
	}

	create() {
		game.state.start('menu');
	}
}