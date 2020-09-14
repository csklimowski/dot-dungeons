import game from '../game';

export class InfoBox extends Phaser.Image {

    text: Phaser.BitmapText;
    targetY: number;
    undoIcon: Phaser.Image;

	constructor() {
		super(game, 100, game.height, 'info-box');
        game.stage.addChild(this);
        this.text = game.make.bitmapText(this.x + 40, this.y + 30, 'handwriting', '', 70);
        game.stage.addChild(this.text);
        this.targetY = this.y;
        this.undoIcon = game.make.image(850, 0, 'undo');
        game.stage.addChild(this.undoIcon);
    }

    update() {
        let dt = game.time.elapsedMS / 1000;
        this.y += 10*(this.targetY - this.y)*dt;
        this.text.y = this.y + 30;
        this.undoIcon.y = this.y + 32;
    }
    
    appear(text) {
        if (text.indexOf('    ') !== -1) {
            this.undoIcon.alpha = 1;
        } else {
            this.undoIcon.alpha = 0;
        }
        this.text.text = text;
        this.targetY = 450;
    }

    dismiss() {
        this.targetY = game.height;
    }
}