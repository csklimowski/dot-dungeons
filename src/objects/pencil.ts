import game from '../game';
import { buildLevelMap, realX, realY } from '../util/map';

export class Pencil extends Phaser.Image {

	charge: number;
	pos: any;
	next: any;

	constructor(x, y, isPen) {
		if (isPen) super(game, realX(x), realY(y), 'pen');
		else       super(game, realX(x), realY(y), 'pencil');
		game.add.existing(this);
		this.anchor.set(0, 1);
		this.alpha = 0.5;

		this.charge = 0;

		this.pos = {
			x: x,
			y: y
		};

		this.next = {
			x: x,
			y: y
		};
	}
}