import game from '../game';
import { MenuButton, LevelButton, MenuArrow } from '../objects/buttons';
import { Number } from '../objects/dot';
import { buildProceduralMap } from '../util/map';

export class MenuState extends Phaser.State {
	create() {
		Cookies.set(
			'dot_dungeons_data', 
			JSON.stringify(game.data),
			{expires: 365}
		);
		game.world.setBounds(0, 0, 7680, 1440);
		this.graphics = game.add.graphics(0, 0);
		this.buttons = game.add.group();
		game.mode = 'puzzle';

		game.camera.x = game.menuX;
		game.camera.y = game.menuY;

		game.world1arrows = [
			new MenuArrow(2400, 420, 2560, 0, 180, game.levels['2-1'].unlocked),
			new MenuArrow(2200, 630, 1280, 720, 270, game.levels['X-1'].unlocked)
		];
		game.world2arrows = [
			new MenuArrow(3700, 290, 3840, 0, 180, game.levels['3-1'].unlocked),
			new MenuArrow(3450, 580, 2560, 720, 270, game.levels['Y-1'].unlocked)
		];
		game.world3arrow = new MenuArrow(4970, 450, 3840, 720, 270, game.levels['Z-1'].unlocked);

		for (let levelName in game.levels) {
			let button = new LevelButton(levelName);
			game.levels[levelName].button = button;
		}

		this.scenery = [
			game.add.image(350, 50, 'logo'),
			game.add.image(0, 720, 'credits-page'),
			game.add.image(1280, 0, 'world1'),
			new Number(1890, 90, '1'),
			game.add.image(1280, 720, 'worldx'),
			game.add.image(2560, 0, 'world2'),
			new Number(3250, 90, '2'),
			game.add.image(2560, 720, 'worldy'),
			game.add.image(3840, 0, 'world3'),
			new Number(4250, 90, '3'),
			game.add.image(3840, 720, 'worldz')
		];


		this.buttons = [
			new MenuButton(200, 400, 'endless-dungeon', function() {
				game.mode = 'random';
				game.room = 1;
				game.onesCaptured = 0;
				game.twosCaptured = 0;
				game.threesCaptured = 0;
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

			new MenuButton(650, 610, 'credits', function() {
				game.menuY = 720;
			}, this),

			new MenuButton(160, 830, 'back', function() {
				game.menuY = 0;
			}, this),

			new MenuArrow(1400, 130, 0, 0, 0, true),	
			new MenuArrow(2450, 850, 1280, 0, 90, true),

			new MenuArrow(2680, 350, 1280, 0, 0, true),
			new MenuArrow(3720, 850, 2560, 0, 90, true),

			new MenuArrow(3960, 580, 2560, 0, 0, true),
			new MenuArrow(4650, 850, 3840, 0, 90, true),
		]

		this.unlockButton = new MenuButton(950, 1140, 'unlock-everything', function() {
			for (let levelName in game.levels) {
				game.data.levels[levelName].unlocked = true;
				game.levels[levelName].unlocked = true;
			}
			game.curtain.transition('menu');
		}, this);

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