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
            this.scale.set(1.1);
        }, this);
    
        this.onInputOut.add(function() {
            this.scale.set(1);
        }, this);
	}
}