import game from '../game';

export class LevelButton extends Phaser.Button {

    constructor(x, y, level) {
        super(game, x, y, 'level-button');
        game.add.existing(this);

        this.onInputDown.add(function() {
            game.currentLevel = this.level;
            game.state.start('main');
        }, this);

        this.anchor.set(0.5, 0.5);
        this.level = level;
    }

    enable() {
        this.popup = game.add.group();
        this.popup.x = this.x;
        this.popup.y = this.y;
        this.popup.scale.tween = game.add.tween(this.popup.scale);

        let bubble = game.add.image(0, 0, 'level-popup');
        bubble.anchor.set(0.5, 1.5);
        this.popup.add(bubble);

        let text = game.add.bitmapText(0, 0, 'handwritten', this.level.id + '\n' + this.level.name, 32);
        text.anchor.set(0.5, 1.5);
        this.popup.add(text);

        this.popup.scale.set(0);
        
        this.onInputOver.add(function() {
            this.frame = 1;
            game.add.tween(this.popup.scale).to({x: 1, y: 1}, 100).start();
        }, this);

        this.onInputOut.add(function() {
            this.frame = 0;
            game.add.tween(this.popup.scale).to({x: 0, y: 0}, 100).start();
        }, this);
    }
}