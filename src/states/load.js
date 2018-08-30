import game from '../game';
import { world1 } from '../levels/world1';
import { world1b } from '../levels/world1b';
import { world2 } from '../levels/world2';
import { world2b } from '../levels/world2b';
import { world3 } from '../levels/world3';
import { world3b } from '../levels/world3b';
import { tutorial } from '../levels/tutorial';
import { Curtain } from '../objects/curtain';
import { InfoBox } from '../objects/infoBox';

export class LoadState extends Phaser.State {
	preload() {
		game.add.text(game.width/2, game.height/2, 'Loading...', { font: '30px sans-serif', fill: '#ffffff', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

		//game.load.bitmapFont('small', 'font/small.png', 'font/small.fnt');
		game.load.spritesheet('level-button', 'img/menu/level-button.png', 70, 70);
		game.load.spritesheet('dot', 'img/dot.png', 24, 24);
		game.load.spritesheet('one', 'img/one.png', 100, 100);
		game.load.spritesheet('two', 'img/two.png', 100, 100);
		game.load.spritesheet('three', 'img/three.png', 100, 100);
		game.load.spritesheet('door', 'img/door.png', 130, 130);
		game.load.spritesheet('charge', 'img/charge.png', 60, 60);
		game.load.spritesheet('starburst', 'img/starburst.png', 130, 130);
		game.load.spritesheet('arrow', 'img/menu/level-arrow.png', 110, 110);
		game.load.image('paper-texture', 'img/paper-texture.png');
		game.load.image('pencil', 'img/pencil.png');
		game.load.image('puzzles', 'img/menu/puzzles.png');
		game.load.image('transition', 'img/transition.png');
		game.load.image('random-dungeon', 'img/menu/random-dungeon.png');
		game.load.image('logo', 'img/menu/logo.png');
		game.load.image('how-to-play', 'img/menu/how-to-play.png');
		game.load.image('credits', 'img/menu/credits.png');
		game.load.image('info-box', 'img/info-box.png');
		game.load.image('question-mark', 'img/question-mark.png');
		game.load.image('undo', 'img/undo.png');
		game.load.image('exit', 'img/exit.png');
		game.load.image('world1', 'img/menu/world1.png');
		game.load.image('worldx', 'img/menu/worldx.png');

		game.load.bitmapFont('handwriting', 'font/hw5.png', 'font/hw5.fnt');
	}

	create() {
		// retrieve cookie
		if (docCookies.hasItem('dot_dungeons_data')) {
			let dataString = docCookies.getItem('dot_dungeons_data');
			game.data = JSON.parse(dataString);
		} else {
			game.data = {
				levels: {
					'1-1': {
						unlocked: true,
						completed: false
					}
				}
			};
		}

		game.data = {
			levels: {
				'1-1': {
					unlocked: true,
					completed: true
				},
				'1-2': {
					unlocked: true,
					completed: true
				},
				'1-3': {
					unlocked: true,
					completed: true
				},
				'1-4': {
					unlocked: true,
					completed: true
				},
				'1-5': {
					unlocked: true,
					completed: true
				},
				'2-1': {
					unlocked: true,
					completed: false
				},
				'X-1': {
					unlocked: true,
					completed: false
				}
			}
		};

		// load levels
		game.tutorial = tutorial;
		game.levels = [];
		Object.assign(game.levels, world1, world1b, world2, world2b, world3, world3b);

		// import save data
		for (let levelName in game.levels) {
			if (!game.data.levels[levelName]) {
				game.data.levels[levelName] = {
					unlocked: false,
					completed: false
				}
			}
		}
		for (let levelName in game.data.levels) {
			game.levels[levelName].unlocked = game.data.levels[levelName].unlocked;
			game.levels[levelName].completed = game.data.levels[levelName].completed;
		}

		// create permanent elements
		game.infoBox = new InfoBox();
		game.curtain = new Curtain();
		game.overlay = game.make.tileSprite(0, 0, 7680, 1440, 'paper-texture');
		game.stage.addChild(game.overlay);

		// initialize globals
		game.menuX = 0;
		game.menuY = 0;

		game.state.start('menu');
	}
}