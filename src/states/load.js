import game from '../game';

export class LoadState extends Phaser.State {
	preload() {
		game.load.bitmapFont('font', 'font/font.png', 'font/font.fnt');
	}

	create() {
		game.state.start('level-select');
	}
}