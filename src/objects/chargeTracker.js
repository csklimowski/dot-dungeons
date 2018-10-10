import game from '../game';

export class ChargeTracker extends Phaser.Sprite {
	constructor() {
		super(game, game.width/2, 80, 'starburst', 15);
		game.add.existing(this);

		this.charge = 0;
		this.number = game.add.sprite(this.x, this.y, 'charge', 5);
		this.numberCopy = game.add.sprite(this.x, this.y, 'charge', 5);

		this.number.anchor.set(0.5);
		this.number.scale.set(0);
		this.numberCopy.anchor.set(0.5);

		this.animations.add(
			'appear',
			[14, 13, 12, 11, 10, 9, 8, 7, 6, 5],
			30, false	
		);

		this.animations.add(
			'disappear',
			[6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
			30, false
		);

		this.animations.add(
			'pulse',
			[0, 1, 2, 3, 4, 5],
			20, false
		);

		this.anchor.set(0.5);
	}

	loseCharge() {
		if (this.charge > 0) {
			this.charge = 0;
			this.animations.play('disappear');
			game.add.tween(this.number.scale).to({x: 0, y: 0}, 250).start();
		}
	}

	gainCharge() {
		if (this.charge === 0) {
			this.animations.play('appear');
			game.add.tween(this.number.scale).to({x: 1, y: 1}, 250).start();
		} else {
			this.animations.play('pulse');
		}

		this.charge++;
		if (this.charge > 5) this.charge = 5;
		this.number.frame = this.charge - 1;
	}

	setCharge(charge) {
		if (charge > 5) charge = 5;
		this.charge = charge;
		
		if (charge === 0) {
			this.number.scale.set(0);
			this.frame = 15;
		} else {
			this.number.scale.set(1);
			this.frame = 0;
			this.number.frame = charge - 1;
		}
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		this.rotation += dt;
		this.number.rotation = Math.sin(game.time.now/300)/8;
	}
}