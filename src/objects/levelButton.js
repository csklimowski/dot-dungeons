import game from '../game';

export class LevelButton extends Phaser.Button {
	constructor(level) {
		super(game, level.x, level.y, 'level-button', null, null, 1, 0, 1, 0);
		game.add.existing(this);

		this.onInputDown.add(function() {
			game.currentLevel = this.level;
			game.state.start('main');
			//console.log(this.level);
		}, this);

		// this.input.enableDrag();

		this.setFrames(1, 0, 1, 0);

		this.level = level;
		this.anchor.set(0.5);
		this.scale.set(2);
	}
}