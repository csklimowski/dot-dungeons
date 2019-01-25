import game from '../game';

export class Number extends Phaser.Sprite {
	constructor(x, y, type) {
		let idleFrames, deadFrame, value, key;
		if (type === '1') {
			idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
						  7, 7, 7, 7, 7, 7, 7, 7,
						  7, 6, 5, 4, 3, 2, 1, 0,
						  0, 0, 0, 0, 0, 0, 0, 0];
			deadFrame = 8;
			value = 1;
			key = 'one';
		} else if (type === '2') {
			idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
						  8, 7, 6, 5, 4, 3, 2, 1,
						  0, 9, 10, 11, 12, 13, 14, 15,
						  16, 15, 14, 13, 12, 11, 10, 9];
			deadFrame = 17;
			value = 2;
			key = 'two';
		} else if (type === '3') {
			idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
						  8, 9, 10, 11, 12, 13, 14, 15,
						  16, 17, 18, 19, 20, 21, 22, 23,
						  24, 25, 26, 27, 28, 29, 30, 31];
			deadFrame = 32;
			value = 3;
			key = 'three';
		}
		super(game, x, y, key);
		game.add.existing(this);

		this.anchor.set(0.5);
		this.value = value;
		this.animations.add('idle', idleFrames, 20, true);
		this.animations.add('die', [deadFrame], 0, false);
		this.animations.play('idle');
	}
}

export class Dot extends Phaser.Image {
	constructor(x, y, type) {
		super(game, x, y, 'dot');
		game.add.existing(this);

		this.anchor.set(0.5);
		this.visited = false;

		if (type === '1' || type === '2' || type === '3') {
			this.hasNumber = true;
			this.hadNumber = false;
			this.number = new Number(x, y, type);
		} else {
			this.hasNumber = false;
			this.hadNumber = false;
		}

		if (type === 'X') {
			let door = game.add.sprite(x, y, 'door');
			door.animations.add('unlock', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
				10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, false);
			door.anchor.set(0.5);
			this.door = door;
			this.locked = true;
		} else {
			this.locked = false;
		}

		if ('abcdn'.indexOf(type) !== -1) {
			let qm = game.add.sprite(x, y, 'question-mark');
			qm.anchor.set(0.5);
			this.qm = qm;
			this.hasInfo = true;
		} else {
			this.hasInfo = false;
		}
	}

	update() {
		if (this.hasInfo && !this.everVisited) {
			this.qm.rotation = Math.sin(game.time.now/200)/6;
		}

		if (this.hadNumber) {
			let dt = game.time.elapsedMS / 1000;
			this.number.vy += 1000*dt;
			this.number.x += this.number.vx*dt;
			this.number.y += this.number.vy*dt;
			this.number.rotation += 2*dt;
		}
	}

	markVisited() {
		if (this.hasInfo) {
			this.qm.scale.set(0.8);
			this.everVisited = true;
		}
		this.visited = true;
		this.frame = 1;
	}

	unmarkVisited() {
		this.visited = false;
		this.frame = 0;
	}

	defeatNumber() {
		game.sfx.whack.play();
		let r = Math.random();
		if (r > 0.8) {
			game.sfx.aah.play();
		} else if (r > 0.6) {
			game.sfx.oof.play();
		}
		this.number.animations.play('die');
		this.hasNumber = false;
		this.hadNumber = true;
		this.number.vx = (1200-this.x)/3;
		this.number.vy = -1000;
	}

	reviveNumber() {
		this.number.animations.play('idle');
		this.hasNumber = true;
		this.hadNumber = false;
		this.number.x = this.x;
		this.number.y = this.y;
		this.number.rotation = 0;
	}

	unlock() {
		if (this.locked) {
			this.door.animations.play('unlock');
			game.sfx.door.play();
			this.locked = false;
		}
		this.locked = false;
	}

	lock() {
		if (!this.locked) {
			this.door.frame = 0;
			this.locked = true;
		}
	}
}