import game from '../game';
import { world1 } from '../levels/world1';
import { LevelButton } from '../objects/levelButton';

export class LevelSelectState extends Phaser.State {
	create() {
		game.stage.backgroundColor = 0xffffff;
		
		for (let i = 0; i < world1.length; i++) {
			new LevelButton(200 + 50*Math.floor(i / 2), 200 + 50*(i % 2), world1[i]);
		}
	}
}