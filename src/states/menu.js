import game from '../game';
import { world1 } from '../levels/world1';
import { LevelButton } from '../objects/levelButton';
import { MenuButton } from '../objects/menuButton';
import { buildProceduralMap } from '../util/map';

export class MenuState extends Phaser.State {
	create() {
		game.world.setBounds(0, 0, 2560, 1440);
		game.stage.backgroundColor = 0xffffff;
		this.buttons = game.add.group();
		for (let i = 0; i < world1.length; i++) {
			this.buttons.add(new LevelButton(150 + 50*Math.floor(i / 2), 200 + 50*(i % 2), world1[i]));
		}
		
		this.screenPos = {
			x: 0,
			y: 0
		};

		new MenuButton(500, 500, 'puzzles', function() {
			this.screenPos.x = 1280;
			console.log('uh');
			console.log(this.screenPos);
		}, this);

		let backArrow = new MenuButton(1500, 500, 'arrow', function() {
			this.screenPos.x = 0;
		}, this);
		backArrow.angle = 180;

		game.add.image(0, 0, 'paper-texture');
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.camera.x += 5*(this.screenPos.x - game.camera.x)*dt;
		game.camera.y += 5*(this.screenPos.y - game.camera.y)*dt;
	}
}