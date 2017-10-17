import game from '../game';

export class MainState extends Phaser.State {
	create() {

		game.stage.backgroundColor = 0xffffff;

		this.graphics = game.add.graphics(0, 0);
		this.chargeText = game.add.text(0, 0, '0', {
			font: '20px sans-serif',
			fill: '#000000'
		});

		this.map = [];
		for (let y = 0; y < 11; y++) {
			let row = [];
			for (let x = 0; x < 16; x++) {
				row.push({
					x, y,
					realX: this.displayX(x),
					realY: this.displayY(y),
					type: 0
				});
			}
			this.map.push(row);
		}

		let currentX = 7, currentY = 5, nextX = 7, nextY = 5, squares = 50;
		while (squares > 0) {
			let direction = Math.floor(Math.random() * 4);
			while (this.map[nextY][nextX].type !== 0) {
				if (direction === 0 && nextX < this.map[nextY].length - 2) {
					nextX++;
				} else if (direction === 1 && nextY < this.map.length - 2) {
					nextY++;
				} else if (direction === 2 && nextX > 2) {
					nextX--;
				} else if (direction === 3 && nextY > 2) {
					nextY--;
				} else {
					break;
				}
			}
			this.map[nextY][nextX].type = 1;
			currentX = nextX;
			currentY = nextY;
			squares--;
		}

		for (let y = 1; y < this.map.length - 1; y++) {
			for (let x = 1; x < this.map[y].length - 1; x++) {
				if (this.map[y][x].type === 1 && Math.random() > 0.5) {
					let adjacent = 0;
					for (let y2 = -1; y2 < 2; y2++) {
						for (let x2 = -1; x2 < 2; x2++) {
							if (this.map[y+y2][x+x2].type === 1) {
								adjacent++;
							}
						}
					}
					if (adjacent > 7) {
						this.map[y][x].type = 4;
					} else if (adjacent > 6) {
						this.map[y][x].type = 3;
					} else if (adjacent > 5) {
						this.map[y][x].type = 2;
					}
				}
			}
		}

		for (let y = 1; y < this.map.length - 1; y++) {
			for (let x = 1; x < this.map[y].length - 1; x++) {
				let adjacent = 0;
				for (let y2 = -1; y2 < 2; y2++) {
					for (let x2 = -1; x2 < 2; x2++) {
						if (this.map[y+y2][x+x2].type !== 0) {
							adjacent++;
						}
					}
				}
				if (adjacent < 3 && currentX !== x && currentY !== y) {
					this.map[y][x].type = 0;
				}
			}
		}

		for (let y = this.map.length - 2; y > 0; y--) {
			for (let x = this.map[y].length - 2; x > 0; x--) {
				let adjacent = 0;
				for (let y2 = -1; y2 < 2; y2++) {
					for (let x2 = -1; x2 < 2; x2++) {
						if (this.map[y+y2][x+x2].type !== 0) {
							adjacent++;
						}
					}
				}
				if (adjacent < 3 && currentX !== x && currentY !== y) {
					this.map[y][x].type = 0;
				}
			}
		}

		this.player = {
			x: currentX,
			y: currentY,
			nextX: currentX,
			nextY: currentY,
			charge: 0
		};

		this.path = [{
			x: currentX,
			y: currentY
		}];
		
		this.calculateValidMoves();

		game.input.onDown.add(function() {
			this.player.x = this.player.nextX;
			this.player.y = this.player.nextY;

			if (this.map[this.player.y][this.player.x].type === 2 && this.player.charge === 1) {
				this.map[this.player.y][this.player.x].type = 1;
			} else if (this.map[this.player.y][this.player.x].type === 3 && this.player.charge === 2) {
				this.map[this.player.y][this.player.x].type = 1;
			} else if (this.map[this.player.y][this.player.x].type === 4 && this.player.charge === 3) {
				this.map[this.player.y][this.player.x].type = 1;
			}

			let visited = false;
			for (let spot of this.path) {
				if (spot.x === this.player.x && spot.y === this.player.y) {
					visited = true;
					break;
				}
			}
			if (visited) this.player.charge++;
			else         this.player.charge = 0;
			this.chargeText.text = this.player.charge;

			this.path.push({
				x: this.player.x,
				y: this.player.y
			});
			this.calculateValidMoves();
			if (this.validMoves.length === 0) game.state.restart();
		}, this);
	}

	calculateValidMoves() {
		this.validMoves = [];
		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {
				if (!(x === 0 && y === 0) && this.map[this.player.y + y][this.player.x + x].type !== 0) {
					let valid = true;
					for (let i = 0; i < this.path.length - 1; i++) {
						if (this.path[i].x   === this.player.x     && this.path[i].y   === this.player.y &&
							this.path[i+1].x === this.player.x + x && this.path[i+1].y === this.player.y + y) {
							valid = false;
							break;
						}
						if (this.path[i].x   === this.player.x + x && this.path[i].y   === this.player.y + y &&
							this.path[i+1].x === this.player.x     && this.path[i+1].y === this.player.y) {
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
		this.graphics.clear();
		
		let leastDistance = Number.POSITIVE_INFINITY;
		for (let move of this.validMoves) {
			let newDistance = Phaser.Math.distance(
				game.input.x, game.input.y,
				this.displayX(this.player.x + move.x), this.displayY(this.player.y + move.y)
			);
			if (newDistance < leastDistance) {
				this.player.nextX = this.player.x + move.x;
				this.player.nextY = this.player.y + move.y;
				leastDistance = newDistance;
			}
		}
		
		//this.graphics.lineStyle(3, 0x88ccff);
		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				if (this.map[y][x].type !== 0) {
					// if (x < this.map[y].length - 1 && this.map[y][x+1].type !== 0) {
					// 	this.graphics.moveTo(this.map[y][x].realX, this.map[y][x].realY);
					// 	this.graphics.lineTo(this.map[y][x+1].realX, this.map[y][x+1].realY);
					// }
					// if (y < this.map.length - 1 && this.map[y+1][x].type !== 0) {
					// 	this.graphics.moveTo(this.map[y][x].realX, this.map[y][x].realY);
					// 	this.graphics.lineTo(this.map[y+1][x].realX, this.map[y+1][x].realY);
					// }
					if (this.map[y][x].type === 1) {
						this.graphics.beginFill(0xaaaaaa);
						this.graphics.drawCircle(this.map[y][x].realX, this.map[y][x].realY, 10);
					}
					if (this.map[y][x].type === 2) {
						this.graphics.beginFill(0x0000ff);
						this.graphics.drawCircle(this.map[y][x].realX, this.map[y][x].realY, 10);
					}
					if (this.map[y][x].type === 3) {
						this.graphics.beginFill(0xff00ff);
						this.graphics.drawCircle(this.map[y][x].realX, this.map[y][x].realY, 10);
					}
					if (this.map[y][x].type === 4) {
						this.graphics.beginFill(0xff0000);
						this.graphics.drawCircle(this.map[y][x].realX, this.map[y][x].realY, 10);
					}
					this.graphics.endFill();
				}
			}
		}
		
		this.graphics.lineStyle(4, 0x444444);
		this.graphics.moveTo(this.displayX(this.path[0].x), this.displayY(this.path[0].y));
		for (let i = 1; i < this.path.length; i++) {
			this.graphics.lineTo(this.displayX(this.path[i].x), this.displayY(this.path[i].y));
		}
		this.graphics.lineStyle(4, 0x444444, 0.15);
		this.graphics.lineTo(this.displayX(this.player.nextX), this.displayY(this.player.nextY));
		
		//this.graphics.lineStyle(0);
		//this.graphics.beginFill(0x0000ff);
		//this.graphics.drawCircle(this.displayX(this.player.x), this.displayY(this.player.y), 10);
		//this.graphics.endFill();
	}
	
	displayX(x) { return 40*x; }
	displayY(y) { return 40*y; }
}