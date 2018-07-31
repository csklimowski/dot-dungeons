import game from '../game';
import { buildLevelMap, realX, realY } from '../util/map';
import { Pencil } from '../objects/pencil';
import { ChargeTracker } from '../objects/chargeTracker';

export class MainState extends Phaser.State {
	create() {
		this.graphics = game.add.graphics(0, 0);
		let map = buildLevelMap(game.currentLevel);
		this.ct = new ChargeTracker();
		this.pencil = new Pencil(map.startX, map.startY);
		let back = game.add.button(10, 10, 'ui', function() {
			game.curtain.transition('menu');
		}, this, 1, 0);
		let undo = game.add.button(100, 10, 'ui', this.undo, this, 3, 2);
		back.scale.set(2);
		undo.scale.set(2);
		
		this.path = [{
			x: map.startX,
			y: map.startY,
			cleared: false,
			visited: true,
			finished: false,
			charge: 0
		}];
		
		this.exit = map[map.endY][map.endX];
		map[map.startY][map.startX].markVisited();
		this.map = map;
		this.calculateValidMoves();

		game.input.onDown.add(this.movePencil, this);

		game.curtain.raise();
	}

	movePencil() {
		if (game.input.y < 100) return;

		let pencil = this.pencil;
		let map = this.map;

		// move pencil
		pencil.pos.x = pencil.next.x;
		pencil.pos.y = pencil.next.y;
		pencil.x = realX(pencil.pos.x);
		pencil.y = realY(pencil.pos.y);

		if (pencil.pos.x === map.endX && pencil.pos.y === map.endY) {
			game.state.start('menu');
			return;
		}

		// inspect dot
		let dot = map[pencil.pos.y][pencil.pos.x];
		let summary = {
			x: pencil.pos.x,
			y: pencil.pos.y,
			cleared: false,
			visited: false,
			finished: false,
		};

		// defeat number
		if (dot.hasNumber) {
			if (this.ct.charge === dot.number.value) {
				map.remaining -= 1;
				dot.defeatNumber();
				summary.cleared = true;
				if (map.remaining <= 0) {
					this.exit.unlock();
					summary.finished = true;
				}
			}
		}

		// mark as visited
		if (dot.visited) {
			this.ct.gainCharge();
		} else {
			this.ct.loseCharge();
			dot.markVisited();
			summary.visited = true;
		}
		
		// update charge;
		summary.charge = this.ct.charge;
		this.path.push(summary);
		this.calculateValidMoves();
	}

	calculateValidMoves() {
		let pencil = this.pencil;
		let path = this.path;
		this.validMoves = [];
		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {
				if (!(x === 0 && y === 0) && 
					 this.map[pencil.pos.y+y][pencil.pos.x+x] !== null && 
					!this.map[pencil.pos.y+y][pencil.pos.x+x].locked) {
					let valid = true;
					for (let i = 0; i < this.path.length - 1; i++) {
						if (path[i].x   === pencil.pos.x && 
							path[i].y   === pencil.pos.y &&
							path[i+1].x === pencil.pos.x + x &&
							path[i+1].y === pencil.pos.y + y) {
							valid = false;
							break;
						}
						if (path[i].x   === pencil.pos.x + x && 
							path[i].y   === pencil.pos.y + y &&
							path[i+1].x === pencil.pos.x     && 
							path[i+1].y === pencil.pos.y) {
							valid = false;
							break;
						}
					}
					if (valid) this.validMoves.push({x, y});
				}
			}
		}
	}
	
	update() {
		let pencil = this.pencil;
		
		let leastDistance = Number.POSITIVE_INFINITY;
		for (let move of this.validMoves) {
			let newDistance = Phaser.Math.distance(
				game.input.x, game.input.y,
				realX(pencil.pos.x + move.x), 
				realY(pencil.pos.y + move.y)
			);
			if (newDistance < leastDistance) {
				pencil.next.x = pencil.pos.x + move.x;
				pencil.next.y = pencil.pos.y + move.y;
				leastDistance = newDistance;
			}
		}
		
		let g = this.graphics;
		let path = this.path;
		g.clear();
		g.lineStyle(9, 0x444444);
		g.moveTo(realX(path[0].x), realY(path[0].y));
		for (let i = 1; i < path.length; i++) {
			g.lineTo(realX(path[i].x), realY(path[i].y));
		}
		g.lineStyle(8, 0x444444, 0.15);
		g.lineTo(realX(pencil.next.x), realY(pencil.next.y));
	}

	undo() {
		if (this.path.length <= 1) return;

		let ult = this.path.pop();
		let pen = this.path[this.path.length-1];
		
		let p = this.pencil;
		p.pos.x = pen.x;
		p.pos.y = pen.y;
		p.x = realX(pen.x);
		p.y = realY(pen.y);

		this.ct.setCharge(pen.charge);
		
		if (ult.cleared) {
			this.map[ult.y][ult.x].reviveNumber();
			this.map.remaining++;
		}
		if (ult.visited) {
			this.map[ult.y][ult.x].unmarkVisited();
		}
		if (ult.finished) {
			this.exit.lock();
		}
		this.calculateValidMoves();
	}
}