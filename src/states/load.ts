import game from '../game';
import { world1 } from '../levels/world1';
import { worldx } from '../levels/worldx';
import { world2 } from '../levels/world2';
import { worldy } from '../levels/worldy';
import { world3 } from '../levels/world3';
import { worldz } from '../levels/worldz';
import { tutorial } from '../levels/tutorial';
import { Curtain } from '../objects/curtain';
import { InfoBox } from '../objects/infoBox';
import { MenuButton } from '../objects/buttons';

export class LoadState extends Phaser.State {
	preload() {
		game.add.text(game.width/2, game.height/2, 'Loading...', { font: '30px sans-serif', fill: '#ffffff', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';

		game.load.spritesheet('level-button', 'img/menu/level-button.png', 70, 70);
		game.load.spritesheet('dot', 'img/game/dot.png', 24, 24);
		game.load.spritesheet('one', 'img/game/one.png', 100, 100);
		game.load.spritesheet('two', 'img/game/two.png', 100, 100);
		game.load.spritesheet('three', 'img/game/three.png', 100, 100);
		game.load.spritesheet('door', 'img/game/door.png', 130, 130);
		game.load.spritesheet('charge', 'img/game/charge.png', 60, 60);
		game.load.spritesheet('starburst', 'img/game/starburst.png', 150, 150);
		game.load.spritesheet('numburst', 'img/game/numburst.png', 100, 100);
		game.load.spritesheet('arrow', 'img/menu/level-arrow.png', 110, 110);
		game.load.spritesheet('hint-1', 'img/game/hint-1.png', 250, 150);
		game.load.spritesheet('hint-2', 'img/game/hint-2.png', 150, 150);
		game.load.spritesheet('volume', 'img/volume.png', 76, 72);

		game.load.image('logo', 'img/logo.png');
		game.load.image('paper-texture', 'img/paper-texture.png');
		game.load.image('transition', 'img/transition.png');
		game.load.image('pencil', 'img/game/pencil.png');
		game.load.image('pen', 'img/game/pen.png');
		game.load.image('puzzles', 'img/menu/puzzles.png');
		game.load.image('endless-dungeon', 'img/menu/endless-dungeon.png');
		game.load.image('how-to-play', 'img/menu/how-to-play.png');
		game.load.image('credits', 'img/menu/credits.png');
		game.load.image('info-box', 'img/game/info-box.png');
		game.load.image('question-mark', 'img/game/question-mark.png');
		game.load.image('undo', 'img/game/undo.png');
		game.load.image('exit', 'img/game/exit.png');
		game.load.image('retry', 'img/menu/retry.png');
		game.load.image('main-menu', 'img/menu/main-menu.png');
		game.load.image('back', 'img/menu/back.png');
		game.load.image('unlock-everything', 'img/menu/unlock-everything.png');
		game.load.image('credits-page', 'img/menu/credits-page.png');
		game.load.image('world1', 'img/menu/world1.png');
		game.load.image('worldx', 'img/menu/worldx.png');
		game.load.image('world2', 'img/menu/world2.png');
		game.load.image('worldy', 'img/menu/worldy.png');
		game.load.image('world3', 'img/menu/world3.png');
		game.load.image('worldz', 'img/menu/worldz.png');

		game.load.audio('pen', 'sfx/pen.ogg');
		game.load.audio('click', 'sfx/click.ogg');
		game.load.audio('music', 'sfx/music.ogg');
		game.load.audio('door', 'sfx/door.ogg');
		game.load.audio('charge1', 'sfx/charge1.ogg');
		game.load.audio('charge2', 'sfx/charge2.ogg');
		game.load.audio('charge3', 'sfx/charge3.ogg');
		game.load.audio('charge4', 'sfx/charge4.ogg');
		game.load.audio('charge5', 'sfx/charge5.ogg');
		game.load.audio('swoosh', 'sfx/swoosh.ogg');
		game.load.audio('whack', 'sfx/whack.ogg');
		game.load.audio('oof', 'sfx/oof.ogg');
		game.load.audio('whack', 'sfx/whack.ogg');
		game.load.audio('aah', 'sfx/aah.ogg');

		game.load.bitmapFont('handwriting', 'font/hw5.png', 'font/hw5.fnt');
	}

	create() {
		game.sfx = {
			music: game.add.audio('music', 1, true),
			pen: game.add.audio('pen', 0.8, false),
			click: game.add.audio('click', 1.2, false),
			door: game.add.audio('door', 1, false),
			charge: [
				game.add.audio('charge1', 1.5, false),
				game.add.audio('charge2', 1.5, false),
				game.add.audio('charge3', 1.5, false),
				game.add.audio('charge4', 1.5, false),
				game.add.audio('charge5', 1.5, false)
			],
			swoosh: game.add.audio('swoosh', 0.15, false),
			whack: game.add.audio('whack', 0.5, false),
			oof: game.add.audio('oof', 0.15, false),
			aah: game.add.audio('aah', 0.15, false)
		};
		
		if (localStorage.getItem('dot_dungeons_data')) {
			let dataString = localStorage.getItem('dot_dungeons_data');
			game.data = JSON.parse(dataString);
		} else {
			game.data = {
				levels: {
					'1-1': {
						unlocked: true,
						completed: false
					}
				},
				highScore: -1,
				soundSetting: 0
			};
		}

		game.tutorial = tutorial;
		game.levels = {...world1, ...worldx, ...world2, ...worldy, ...world3, ...worldz};

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

		game.soundButton = new MenuButton(1220, 45, 'volume', function() {
			if (this.data.soundSetting === 0) {
				this.sound.mute = true;
				this.sfx.music.stop();
				this.data.soundSetting = 1;
				this.soundButton.frame = 1;
			} else if (this.data.soundSetting === 1) {
				this.sound.mute = false;
				this.data.soundSetting = 2;
				this.soundButton.frame = 2;
			} else if (this.data.soundSetting === 2) {
				this.sfx.music.play();
				this.data.soundSetting = 0;
				this.soundButton.frame = 0;
			}

			localStorage.setItem(
				'dot_dungeons_data', 
				JSON.stringify(game.data)
			);
		}, game);

		if (game.data.soundSetting === 0) {
			game.sfx.music.play();
			game.soundButton.frame = 0;
		} else if (game.data.soundSetting === 1) {
			game.sound.mute = true;
			game.soundButton.frame = 1;
		} else if (game.data.soundSetting === 2) {
			game.soundButton.frame = 2;
		}

		game.stage.addChild(game.soundButton);
		game.infoBox = new InfoBox();
		game.curtain = new Curtain();
		game.overlay = game.make.tileSprite(0, 0, 7680, 1440, 'paper-texture', 0);
		game.stage.addChild(game.overlay);

		game.menuX = 0;
		game.menuY = 0;

		game.stage.backgroundColor = 0xffffff;

		game.state.start('menu');
	}
}