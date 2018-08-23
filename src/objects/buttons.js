import game from '../game';

export class LevelButton extends Phaser.Button {
	constructor(level) {
		super(game, level.x, level.y, 'level-button', null, null, 1, 0, 1, 0);
		game.add.existing(this);

		// this.onInputDown.add(function() {
		// 	game.currentLevel = this.level;
		// 	game.curtain.transition('main');
		// }, this);

		this.input.enableDrag();

		this.setFrames(1, 0, 1, 0);

		this.level = level;
		this.anchor.set(0.5);
		this.scale.set(2);
	}
}

export class MenuButton extends Phaser.Button {
	constructor(x, y, image, onDown, onDownContext) {
		super(game, x, y, image);
		game.add.existing(this);
		this.anchor.set(0.5);
		this.targetScale = 1;

		if (onDown) {
			this.onInputDown.add(onDown, onDownContext);
		}

		this.onInputOver.add(function() {
			this.scale.set(1.1);
		}, this);
	
		this.onInputOut.add(function() {
			this.scale.set(1);
		}, this);
	}
}

export class MenuArrow extends MenuButton {
	constructor(x, y, menuX, menuY, angle) {
		super(x, y, 'arrow');
		
		this.onInputDown.add(function() {
			game.menuX = this.menuX;
			game.menuY = this.menuY;
		}, this);

		this.frame = 11;
		this.angle = angle;
		this.menuX = menuX;
		this.menuY = menuY;
	}
}