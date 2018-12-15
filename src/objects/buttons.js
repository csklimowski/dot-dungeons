import game from '../game';

export class LevelButton extends Phaser.Sprite {
	constructor(level) {
		let levelInfo = game.levels[level];
		super(game, levelInfo.x, levelInfo.y, 'level-button');
		game.add.existing(this);

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
			this.frame = 12;
			if (this.enabled) {
				game.currentLevel = this.level;
				game.curtain.transition('main');
			}
		}, this);

		this.animations.add('enable', 
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			20,
			false
		);

		this.animations.add('complete',
			[11, 11, 11, 11, 11, 11, 11, 11, 
			 11, 11, 11, 11, 11, 11, 11, 11, 
			 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 12],
			20,
			false
		);

		if (game.justCompleted === this.level) {
			game.levels[this.level].completed = true;
			this.overFrame = 2;
			this.outFrame = 12;
			this.events.onAnimationComplete.addOnce(this.unlockNext, this);
			this.animations.play('complete');
			game.justCompleted = null;
		}
	}

	unlockNext() {
		for (let level of game.levels[this.level].unlocks) {
			if (!game.levels[level].unlocked) {
				game.levels[level].unlocked = true;
				let button = game.levels[level].button;
				button.enabled = true;
				button.overFrame = 6;
				button.outFrame = 11;
				button.animations.play('enable');
			}
		}
		if (this.level === '1-5') {
			for (let arrow of game.world1arrows) {
				if (!arrow.enabled) {
					arrow.enabled = true;
					arrow.animations.play('enable');
				}
			}
		}
		if (this.level === '2-5') {
			for (let arrow of game.world2arrows) {
				if (!arrow.enabled) {
					arrow.enabled = true;
					arrow.animations.play('enable');
				}
			}
		}
		if (this.level === '3-5') {
			if (!game.world3arrow.enabled) {
				game.world3arrow.enabled = true;
				game.world3arrow.animations.play('enable');
			}
		}
	}
}

export class MenuButton extends Phaser.Sprite {
	constructor(x, y, image, onDown, onDownContext) {
		super(game, x, y, image);
		game.add.existing(this);
		this.anchor.set(0.5);
		this.targetScale = 1;
		this.inputEnabled = true;
		this.onDown = onDown;
		this.onDownContext = onDownContext;

		if (onDown) {
			this.events.onInputDown.add(function() {
				this.scale.set(1);
				this.onDown.call(onDownContext);
			}, this);
		}

		this.events.onInputUp.add(function() {
			this.scale.set(1.1);
		}, this);

		this.events.onInputOver.add(function() {
			this.scale.set(1.1);
		}, this);
	
		this.events.onInputOut.add(function() {
			this.scale.set(1);
		}, this);
	}
}

export class MenuArrow extends MenuButton {
	constructor(x, y, menuX, menuY, angle, enabled) {
		super(x, y, 'arrow');
		
		this.events.onInputDown.add(function() {
			this.scale.set(1);
			if (this.enabled) {
				game.menuX = this.menuX;
				game.menuY = this.menuY;
			}
		}, this);

		this.angle = angle;
		this.menuX = menuX;
		this.menuY = menuY;
		this.enabled = enabled;
		if (enabled) {
			this.frame = 11;
		} else {
			this.animations.add('enable', 
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				40,
				false
			);
		}
	}
}