import game from '../game';
import { MenuButton, LevelButton, MenuArrow } from '../objects/buttons';
import { buildProceduralMap } from '../util/map';

export class MenuState extends Phaser.State {
	create() {
		game.world.setBounds(0, 0, 7680, 1440);
		game.stage.backgroundColor = 0xffffff;
		this.graphics = game.add.graphics(0, 0);
		this.buttons = game.add.group();
		game.mode = 'puzzle';

		game.camera.x = game.menuX;
		game.camera.y = game.menuY;

		for (let levelName in game.levels) {
			game.levels[levelName].button = new LevelButton(game.levels[levelName]);
		}

		this.scenery = [
			game.add.image(350, 50, 'logo'),
			game.add.image(520, 550, 'credits'),
		]


		this.buttons = [
			new MenuButton(200, 400, 'random-dungeon', function() {
				game.mode = 'random';
				game.room = 1;
				game.curtain.transition('main');
			}, this),

			new MenuButton(1100, 400, 'puzzles', function() {
				game.menuX = 1280;
			}, this),

			new MenuButton(650, 400, 'how-to-play', function() {
				game.mode = 'tutorial';
				game.room = 0;
				game.curtain.transition('main');
			}, this),

			new MenuArrow(1400, 300, 0, 0, 0),
			new MenuArrow(2400, 300, 2560, 0, 180),
			new MenuArrow(2400, 500, 1280, 720, 270),
			new MenuArrow(2400, 850, 1280, 0, 90),

			new MenuArrow(2680, 300, 1280, 0, 0),
			new MenuArrow(3680, 300, 3840, 0, 180),
			new MenuArrow(3680, 500, 2560, 720, 270),
			new MenuArrow(3680, 850, 2560, 0, 90),

			new MenuArrow(3960, 300, 2560, 0, 0),
			new MenuArrow(4960, 500, 3840, 720, 270),
			new MenuArrow(4960, 850, 3840, 0, 90),
		]

		game.curtain.raise();
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.camera.x += 5*(game.menuX - game.camera.x)*dt;
		game.camera.y += 5*(game.menuY - game.camera.y)*dt;

		let g = this.graphics;
		g.clear();
		g.lineStyle(7, 0x444444);
		for (let levelName in game.levels) {
			let level = game.levels[levelName];
			for (let nextName of level.unlocks) {
				let next = game.levels[nextName];
				g.moveTo(level.button.x, level.button.y);
				g.lineTo(next.button.x, next.button.y);
			}
		}
	}
}