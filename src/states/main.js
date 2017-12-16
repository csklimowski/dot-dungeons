import game from '../game';
import { buildLevelMap } from '../util/map';

export class MainState extends Phaser.State {
	create() {

		game.stage.backgroundColor = 0xffffff;

		this.graphics = game.add.graphics(0, 0);
		this.chargeText = game.add.text(0, 0, '0', {
			font: '20px sans-serif',
			fill: '#000000'
		});

		this.map = buildLevelMap(game.currentLevel);

		this.player = {
			x: this.map.startX,
			y: this.map.startY,
			nextX: this.map.startX,
			nextY: this.map.startY,
			charge: 0
		};

		this.path = [{
			x: this.map.startX,
			y: this.map.startY
		}];

		this.exit = this.map[this.map.endY][this.map.endX];
		this.map[this.map.startY][this.map.startX].visited = true;
		
		this.calculateValidMoves();

		game.input.onDown.add(function() {
			this.player.x = this.player.nextX;
			this.player.y = this.player.nextY;

			if (this.player.x === this.map.endX && this.player.y === this.map.endY) {
				game.state.start('level-select');
				return;
			}

			let dot = this.map[this.player.y][this.player.x];

			if (this.player.charge === dot.type) {
				this.map.remaining -= dot.type;
				dot.type = 0;
				dot.frame = 0;
				if (this.map.remaining === 0) {
					this.exit.type = 0;
					this.exit.frame = 0;
				}
			}

			if (dot.visited) {
				this.player.charge++;
			} else {
				dot.visited = true;
				this.player.charge = 0;
			}
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
				if (!(x === 0 && y === 0) && this.map[this.player.y + y][this.player.x + x] !== null && this.map[this.player.y + y][this.player.x + x].type !== 6) {
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