import game from '../game';

export class LevelButton extends Phaser.Button {

	constructor(x, y, level) {
		super(game, x, y, 'level-button');
		game.add.existing(this);

		this.onInputDown.add(function() {
			game.currentLevel = this.level;
			game.state.start('main');
		}, this);

		this.anchor.set(0.5, 0.5);
		this.level = level;
		
		this.onInputOver.add(function() {
			this.frame = 1;
		}, this);
	
		this.onInputOut.add(function() {
			this.frame = 0;
		}, this);
	}

	enable() {
	}
}