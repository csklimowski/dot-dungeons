import game from '../game';

export class Curtain extends Phaser.Image {
    constructor() {
        super(game, game.width/2, game.height, 'transition');
        game.add.existing(this);
        this.anchor.set(0.5, 0);
        this.angle = 180;
        game.add.tween(this).to({y: game.height + 2000}, 800).start();
    }

    update() {
        this.x = game.camera.x + game.width/2;
    }

    transition(newState) {
        this.newState = newState;
        this.y = -1000;
        this.angle = 0;
        let tween = game.add.tween(this).to({y: 0}, 400);
        tween.onComplete.add(function() {
            game.state.start(this.newState);
        }, this);
        tween.start();
    }
}