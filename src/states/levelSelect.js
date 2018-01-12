import game from '../game';
import { world1 } from '../levels/world1';
import { LevelButton } from '../objects/levelButton';
import { buildProceduralMap } from '../util/map';

export class LevelSelectState extends Phaser.State {
	create() {
		game.stage.backgroundColor = 0xffffff;
		let buttons = [];
		for (let i = 0; i < world1.length; i++) {
			buttons.push(new LevelButton(150 + 50*Math.floor(i / 2), 200 + 50*(i % 2), world1[i]));
		}

		buttons.push(new LevelButton(100, 100, buildProceduralMap()));

		for (let button of buttons) {
			button.enable();
		}
	}
}