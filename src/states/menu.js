import game from '../game';
import { LevelButton } from '../objects/levelButton';
import { MenuButton } from '../objects/menuButton';
import { buildProceduralMap } from '../util/map';
import { Curtain } from '../objects/curtain';

export class MenuState extends Phaser.State {
	create() {
		game.world.setBounds(0, 0, 7680, 1440);
		game.stage.backgroundColor = 0xffffff;
		this.graphics = game.add.graphics(0, 0);
		this.buttons = game.add.group();

		for (let levelName in game.levels) {
			game.levels[levelName].button = new LevelButton(game.levels[levelName]);
		}

		this.screenPos = {
			x: 0,
			y: 0
		};
		
		this.buttons.add(new MenuButton(200, 400, 'random-dungeon', function() {
			game.currentLevel = buildProceduralMap();
			this.curtain.transition('main');
		}, this))

		this.buttons.add(new MenuButton(1000, 400, 'puzzles', function() {
			this.screenPos.x = 1280;
		}, this));

		this.buttons.add(new MenuButton(1400, 300, 'arrow', function() {
			this.screenPos.x = 0;
		}, this, 180));
		this.buttons.add(new MenuButton(2400, 300, 'arrow', function() {
			this.screenPos.x = 2560;
		}, this, 0));
		this.buttons.add(new MenuButton(2400, 500, 'arrow', function() {
			this.screenPos.y = 720;
		}, this, 90));
		this.buttons.add(new MenuButton(2400, 850, 'arrow', function() {
			this.screenPos.y = 0;
		}, this, 270));
		
		this.buttons.add(new MenuButton(2680, 300, 'arrow', function() {
			this.screenPos.x = 1280;
		}, this, 180));
		this.buttons.add(new MenuButton(3680, 300, 'arrow', function() {
			this.screenPos.x = 3840;
		}, this, 0));
		this.buttons.add(new MenuButton(3680, 500, 'arrow', function() {
			this.screenPos.y = 720;
		}, this, 90));
		this.buttons.add(new MenuButton(3680, 850, 'arrow', function() {
			this.screenPos.y = 0;
		}, this, 270));

		this.buttons.add(new MenuButton(3960, 300, 'arrow', function() {
			this.screenPos.x = 2560;
		}, this, 180));
		this.buttons.add(new MenuButton(4960, 500, 'arrow', function() {
			this.screenPos.y = 720;
		}, this, 90));
		this.buttons.add(new MenuButton(4960, 850, 'arrow', function() {
			this.screenPos.y = 0;
		}, this, 270));

		this.curtain = new Curtain();
		for (let levelName in game.levels) {
			game.levels[levelName].button.curtain = this.curtain;
		}
		game.add.tileSprite(0, 0, 7680, 1440, 'paper-texture');
		//game.add.image(0, 0, 'paper-texture');
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.camera.x += 5*(this.screenPos.x - game.camera.x)*dt;
		game.camera.y += 5*(this.screenPos.y - game.camera.y)*dt;

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