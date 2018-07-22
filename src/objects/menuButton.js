import game from '../game';

export class MenuButton extends Phaser.Button {

	constructor(x, y, image, onDown, onDownContext, angle) {
		super(game, x, y, image);
		game.add.existing(this);
		this.onInputDown.add(onDown, onDownContext);
        this.anchor.set(0.5);
        this.targetScale = 1;
        if (angle) this.angle = angle;

        this.onInputOver.add(function() {
            this.targetScale = 1.1;
        }, this);
    
        this.onInputOut.add(function() {
            this.targetScale = 1;
        }, this);
	}
    
    update() {
        let dt = game.time.elapsedMS / 1000;
        this.scale.x += 10*(this.targetScale - this.scale.x)*dt;
        this.scale.y += 10*(this.targetScale - this.scale.y)*dt;
    }
}