import game from '../game';
import { MenuButton, LevelButton, MenuArrow } from '../objects/buttons';
import { Number } from '../objects/dot';
import { buildProceduralMap } from '../util/map';

export class MenuState extends Phaser.State {
	create() {
		docCookies.setItem('dot_dungeons_data', JSON.stringify(game.data));
		game.world.setBounds(0, 0, 7680, 1440);
		game.stage.backgroundColor = 0xffffff;
		this.graphics = game.add.graphics(0, 0);
		this.buttons = game.add.group();
		game.mode = 'puzzle';

		game.camera.x = game.menuX;
		game.camera.y = game.menuY;

		game.world1arrows = [
			new MenuArrow(2400, 420, 2560, 0, 180, game.levels['1-5'].completed),
			new MenuArrow(2200, 630, 1280, 720, 270, game.levels['1-5'].completed)
		];
		game.world2arrows = [
			new MenuArrow(3700, 290, 3840, 0, 180, game.levels['2-5'].completed),
			new MenuArrow(3700, 580, 2560, 720, 270, game.levels['2-5'].completed)
		];

		for (let levelName in game.levels) {
			let button = new LevelButton(levelName);
			game.levels[levelName].button = button;
		}

		this.scenery = [
			game.add.image(350, 50, 'logo'),
			game.add.image(520, 550, 'credits'),
			game.add.image(1280, 0, 'world1'),
			new Number(1890, 90, '1'),
			game.add.image(1280, 720, 'worldx'),
			game.add.image(2560, 0, 'world2'),
			new Number(3250, 90, '2'),
			game.add.image(2560, 720, 'worldy')
		];


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

			new MenuArrow(1400, 130, 0, 0, 0, true),	
			new MenuArrow(2450, 850, 1280, 0, 90, true),

			new MenuArrow(2680, 350, 1280, 0, 0, true),
			new MenuArrow(3520, 850, 2560, 0, 90, true),

			new MenuArrow(3960, 300, 2560, 0, 0, true),
			new MenuArrow(4960, 500, 3840, 720, 270, true),
			new MenuArrow(4960, 850, 3840, 0, 90, true),
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
				if (next.unlocked) {
					g.moveTo(level.button.x, level.button.y);
					g.lineTo(next.button.x, next.button.y);
				}
			}
		}
	}
}