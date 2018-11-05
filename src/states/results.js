import game from '../game';
import { MenuButton } from '../objects/buttons';
import { Number } from '../objects/dot';

export class ResultsState extends Phaser.State {
	create() {
		game.add.bitmapText(420, 50, 'handwriting', 'Floors cleared: ', 80);
		game.add.bitmapText(860, 50, 'handwriting', '5', 80).anchor.set(1, 0);
		game.add.bitmapText(420, 125, 'handwriting', 'Your best: ', 80);
		game.add.bitmapText(860, 125, 'handwriting', '14', 80).anchor.set(1, 0);
		game.add.bitmapText(640, 300, 'handwriting', 'Numbers captured:', 80).anchor.set(0.5, 0);
		game.add.bitmapText(340, 415, 'handwriting', 'x 23', 80);
		game.add.bitmapText(640, 415, 'handwriting', 'x 12', 80);
		game.add.bitmapText(940, 415, 'handwriting', 'x 6', 80);

		

		new MenuButton(460, 600, 'retry', function() {
			game.mode = 'random';
			game.room = 1;
			game.curtain.transition('main');
		}, this);

		new MenuButton(760, 605, 'main-menu', function() {
			game.curtain.transition('menu');
		}, this);

		new Number(300, 450, '1');
		new Number(600, 450, '2');
		new Number(900, 450, '3');

		game.curtain.raise();
	}
}