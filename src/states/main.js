import game from '../game';
import { buildLevelMap, buildProceduralMap, realX, realY } from '../util/map';
import { Pencil } from '../objects/pencil';
import { ChargeTracker } from '../objects/chargeTracker';
import { MenuButton } from '../objects/buttons';

export class MainState extends Phaser.State {
	create() {

		let levelSource;
		let levelText = game.add.bitmapText(15, 0, 'handwriting', '', 80);
		if (game.mode === 'random') {
			levelSource = buildProceduralMap(game.room);
			levelText.text = 'Room ' + game.room;
		} else if (game.mode === 'tutorial') {
			if (game.room === 2) {
				let hint = game.add.sprite(523, 375, 'hint-1');
				hint.animations.add('swish', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 
					                          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
											  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], 20, true);
				hint.animations.play('swish');
			}
			levelSource = game.tutorial[game.room];
			levelText.text = 'How to Play';
		} else if (game.mode === 'puzzle') {
			levelSource = game.levels[game.currentLevel];
			levelText.text = game.currentLevel;
			if (game.currentLevel === '2-2') {
				let hint = game.add.sprite(523, 375, 'hint-2');
				hint.animations.add('swish', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 
					                          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
											  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
										      34, 35, 36, 37, 38, 39], 20, true);
				hint.animations.play('swish');
			}
		}
		
		let map = buildLevelMap(levelSource);
		this.graphics = game.add.graphics(0, 0);
		this.ct = new ChargeTracker();
		this.pencil = new Pencil(map.startX, map.startY);

		let undo = new MenuButton(1150, 45, 'undo', this.undo, this);
		let exit = new MenuButton(1230, 45, 'exit', function() {
			game.infoBox.dismiss();
			game.curtain.transition('menu');
		}, this);
		
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

		if (map[map.startY][map.startX].hasInfo) {
			game.infoBox.appear(map[map.startY][map.startX].info);
		}

		game.input.onDown.add(this.movePencil, this);

		game.curtain.raise();
	}

	movePencil() {
		if (!this.validMoves.length) return;
		if (game.input.y < 100) return;

		let pencil = this.pencil;
		let map = this.map;

		// move pencil
		pencil.pos.x = pencil.next.x;
		pencil.pos.y = pencil.next.y;
		pencil.x = realX(pencil.pos.x);
		pencil.y = realY(pencil.pos.y);

		// inspect dot
		let dot = map[pencil.pos.y][pencil.pos.x];
		let summary = {
			x: pencil.pos.x,
			y: pencil.pos.y,
			cleared: false,
			visited: false,
			finished: false,
		};

		// check for info box
		if (dot.hasInfo) game.infoBox.appear(dot.info);
		else             game.infoBox.dismiss();

		// defeat number
		if (dot.hasNumber) {
			if (this.ct.charge === dot.number.value) {
				map.remaining -= 1;
				dot.defeatNumber();
				summary.cleared = true;
			}
		}

		// mark as visited
		if (dot.visited) {
			this.ct.gainCharge();
		} else {
			if (dot.hasInfo && !dot.everVisited) map.remaining -= 1;
			this.ct.loseCharge();
			dot.markVisited();
			summary.visited = true;
		}

		// unlock exit
		if (map.remaining <= 0) {
			this.exit.unlock();
			summary.finished = true;
		}
		
		// update charge;
		summary.charge = this.ct.charge;
		this.path.push(summary);
		this.calculateValidMoves();

		if (pencil.pos.x === map.endX && pencil.pos.y === map.endY) {
			this.validMoves = [];
			if (game.mode === 'random') {
				game.room++;
				game.curtain.transition('main');
			} else if (game.mode === 'tutorial') {
				game.room++;
				if (game.room >= game.tutorial.length) {
					game.curtain.transition('menu');
				} else {
					game.curtain.transition('main');
				}
			} else {
				if (!game.levels[game.currentLevel].completed) {
					game.justCompleted = game.currentLevel;
				}
				game.data.levels[game.currentLevel].completed = true;
				for (let unlock of game.levels[game.currentLevel].unlocks) {
					game.data.levels[unlock].unlocked = true;
				}
				game.curtain.transition('menu');
			}
		}
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
			if (ult.finished) {
				this.exit.lock();
			}
		}
		if (ult.visited) {
			this.map[ult.y][ult.x].unmarkVisited();
		}
		if (this.map[pen.y][pen.x].hasInfo) {
			game.infoBox.appear(this.map[pen.y][pen.x].info);
		} else {
			game.infoBox.dismiss();
		}
		this.calculateValidMoves();
	}
}