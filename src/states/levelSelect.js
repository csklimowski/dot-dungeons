import game from '../game';
import { world1 } from '../levels/world1';

export class LevelSelectState extends Phaser.State {
	create() {
        this.worlds = [
            world1
		];
		
		game.add.bitmapText(158, 150, 'font', 'Test', 18);
	}
	
	update() {
		game.stage.backgroundColor++;
	}
}