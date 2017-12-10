import game from '../game';

export class LoadState extends Phaser.State {
	preload() {
		game.load.bitmapFont('handwritten', 'font/font2.png', 'font/font2.fnt');
		game.load.spritesheet('level-button', 'img/level-button.png', 32, 32);
		game.load.spritesheet('map-tile', 'img/map-tile.png', 15, 15);
		game.load.image('level-popup', 'img/level-popup.png');
	}

	create() {
		game.state.start('level-select');
	}
}