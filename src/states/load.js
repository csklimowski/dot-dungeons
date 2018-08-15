import game from '../game';
import { world1 } from '../levels/world1';
import { world1b } from '../levels/world1b';
import { world2 } from '../levels/world2';
import { world2b } from '../levels/world2b';
import { world3 } from '../levels/world3';
import { world3b } from '../levels/world3b';
import { Curtain } from '../objects/curtain';

export class LoadState extends Phaser.State {
	preload() {
		game.add.text(game.width/2, game.height/2, 'Loading...', { font: '30px sans-serif', fill: '#ffffff', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

		//game.load.bitmapFont('small', 'font/small.png', 'font/small.fnt');
		game.load.spritesheet('level-button', 'img/level-button.png', 32, 32);
		game.load.spritesheet('dot', 'img/dot.png', 24, 24);
		game.load.spritesheet('one', 'img/one.png', 100, 100);
		game.load.spritesheet('two', 'img/two.png', 100, 100);
		game.load.spritesheet('three', 'img/three.png', 100, 100);
		game.load.spritesheet('door', 'img/door.png', 130, 130);
		game.load.spritesheet('ui', 'img/ui.png', 32, 32);
		game.load.spritesheet('charge', 'img/charge.png', 60, 60);
		game.load.spritesheet('starburst', 'img/starburst.png', 130, 130);
		game.load.image('paper-texture', 'img/paper-texture.png');
		game.load.image('level-popup', 'img/level-popup.png');
		game.load.image('pencil', 'img/pencil.png');
		game.load.image('puzzles', 'img/menu/puzzles.png');
		game.load.image('arrow', 'img/menu/arrow.png');
		game.load.image('transition', 'img/transition.png');
		game.load.image('random-dungeon', 'img/menu/random-dungeon.png');
		game.load.image('logo', 'img/menu/logo.png');
		game.load.image('how-to-play', 'img/menu/how-to-play.png');
		game.load.image('credits', 'img/menu/credits.png');
	}

	create() {
		if (docCookies.hasItem('dot_dungeons_data')) {
			let dataString = docCookies.getItem('dot_dungeons_data');
			game.data = JSON.parse(dataString);
		} else {
			game.data = { unlocks: ['1-1'] };
			docCookies.setItem('dot_dungeons_data', JSON.stringify(game.data));
		}

		game.levels = [];
		Object.assign(game.levels, world1, world1b, world2, world2b, world3, world3b);

		for (let levelName in game.levels)
			game.levels[levelName].unlocked = false;
		for (let levelName of game.data.unlocks)
			game.levels[levelName].unlocked = true;

		game.curtain = new Curtain();
		game.stage.addChild(game.curtain);
		game.overlay = game.make.tileSprite(0, 0, 7680, 1440, 'paper-texture');
		game.stage.addChild(game.overlay);

		game.menuX = 0;
		game.menuY = 0;

		game.state.start('menu');
	}
}