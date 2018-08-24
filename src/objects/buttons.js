import game from '../game';

export class LevelButton extends Phaser.Sprite {
	constructor(level) {
		let levelInfo = game.levels[level];
		super(game, levelInfo.x, levelInfo.y, 'level-button');
		game.add.existing(this);

		// this.onInputDown.add(function() {
		// 	game.currentLevel = this.level;
		// 	game.curtain.transition('main');
		// }, this);

		this.anchor.set(0.5, 0.7);
		this.level = level;
		this.inputEnabled = true;
		if (levelInfo.completed) {
			this.enabled = true;
			this.overFrame = 2;
			this.outFrame = 12;	
		} else if (levelInfo.unlocked) {
			this.enabled = true;
			this.overFrame = 6;
			this.outFrame = 11;
		} else {
			this.enabled = false;
			this.overFrame = 0;
			this.outFrame = 0;
		}

		this.frame = this.outFrame;
		this.events.onInputOver.add(function() {
			this.frame = this.overFrame;
		}, this);
		this.events.onInputOut.add(function() {
			this.frame = this.outFrame;
		}, this);
		this.events.onInputDown.add(function() {
			if (this.enabled) {
				game.currentLevel = this.level;
				game.curtain.transition('main');
			}
		}, this);

		this.input.enableDrag();
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