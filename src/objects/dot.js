import game from '../game';

/**
 * Types:
 *     0: regular dot
 *     1+: number
 *     N: entrance
 *     X: exit
 */
export class Dot extends Phaser.Image {
	constructor(x, y, type) {
		super(game, x, y, 'dot');
		game.add.existing(this);

		this.anchor.set(0.5);
		this.visited = false;

		if (type === '1' || type === '2' || type === '3') {
			this.hasNumber = true;

			let idleFrames, dieFrames, value, key;
			if (type === '1') {
				idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
							  7, 7, 7, 7, 7, 7, 7, 7,
							  7, 6, 5, 4, 3, 2, 1, 0,
							  0, 0, 0, 0, 0, 0, 0, 0];
				dieFrames = [8];
				value = 1;
				key = 'one';
			} else if (type === '2') {
				idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
							  8, 7, 6, 5, 4, 3, 2, 1,
							  0, 9, 10, 11, 12, 13, 14, 15,
							  16, 15, 14, 13, 12, 11, 10, 9];
				dieFrames = [18];
				value = 2;
				key = 'two';
			} else if (type === '3') {
				idleFrames = [0, 1, 2, 3, 4, 5, 6, 7,
							  8, 9, 10, 11, 12, 13, 14, 15,
							  16, 17, 18, 19, 20, 21, 22, 23,
							  24, 25, 26, 27, 28, 29, 30, 31];
				dieFrames = [32];
				value = 3;
				key = 'three';
			}

			let number = game.add.sprite(x, y, key);
			number.anchor.set(0.5);
			number.value = value;
			number.animations.add('idle', idleFrames, 20, true);
			number.animations.add('die', dieFrames, 20, false);
			number.animations.play('idle');

			this.number = number;
		} else {
			this.hasNumber = false;
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
	}

	markVisited() {
		this.visited = true;
		this.frame = 1;
	}

	unmarkVisited() {
		this.visited = false;
		this.frame = 0;
	}

	defeatNumber() {
		this.number.animations.play('die');
		this.hasNumber = false;
	}

	reviveNumber() {
		this.number.animations.play('idle');
		this.hasNumber = true;
	}

	unlock() {
		if (this.locked) {
			this.door.animations.play('unlock');
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