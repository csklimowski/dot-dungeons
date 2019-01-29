import game from '../game';
import { MenuButton } from '../objects/buttons';
import { Number } from '../objects/dot';

export class ResultsState extends Phaser.State {
	create() {
		let score = game.room - 1;

		game.add.bitmapText(420, 50, 'handwriting', 'Rooms cleared: ', 80);
		game.add.bitmapText(860, 50, 'handwriting', score + '', 80).anchor.set(1, 0);

		if (score > game.data.highScore) {
			game.data.highScore = score;
			this.highScoreText = game.add.bitmapText(640, 180, 'handwriting', 'Personal best!', 80);
			this.highScoreText.anchor.set(0.5, 0.5);
			this.newHighScore = true;
		} else {
			game.add.bitmapText(420, 125, 'handwriting', 'Your best: ', 80);
			game.add.bitmapText(860, 125, 'handwriting', game.data.highScore + '', 80).anchor.set(1, 0);
			this.newHighScore = false;
		}

		game.add.bitmapText(640, 300, 'handwriting', 'Numbers captured:', 80).anchor.set(0.5, 0);
		new Number(300, 450, '1');
		new Number(600, 450, '2');
		new Number(900, 450, '3');
		game.add.bitmapText(340, 415, 'handwriting', 'x ' + game.onesCaptured, 80);
		game.add.bitmapText(640, 415, 'handwriting', 'x ' + game.twosCaptured, 80);
		game.add.bitmapText(940, 415, 'handwriting', 'x ' + game.threesCaptured, 80);

		new MenuButton(460, 600, 'retry', function() {
			game.mode = 'random';
			game.room = 1;
			game.onesCaptured = 0;
			game.twosCaptured = 0;
			game.threesCaptured = 0;
			game.curtain.transition('main');
		}, this);

		new MenuButton(760, 605, 'main-menu', function() {
			game.curtain.transition('menu');
		}, this);

		game.soundButton.x = 1220

		game.curtain.raise();
	}

	update() {
		if (this.newHighScore) {
			let scale = this.highScoreText.scale.x;
			this.highScoreText.scale.set(1 + 0.2*Math.sin(0.005*game.time.now));
		}
	}
}