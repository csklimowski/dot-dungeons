import game from '../game';

export class InfoBox extends Phaser.Image {
	constructor() {
		super(game, 100, game.height, 'info-box');
        game.stage.addChild(this);
        let text = "When you revisit a dot, your CHARGE increases.\nWhen you visit a new dot, it is reset to zero."
        this.text = game.make.bitmapText(this.x + 30, this.y + 20, 'handwriting', text, 70);
        game.stage.addChild(this.text);
        this.targetY = this.y;
    }

    update() {
        let dt = game.time.elapsedMS / 1000;
        this.y += 10*(this.targetY - this.y)*dt;
        this.text.y = this.y + 20;
    }
    
    appear(text) {
        this.text.text = text;
        this.targetY = 450;
    }

    dismiss() {
        this.targetY = game.height;
    }
}