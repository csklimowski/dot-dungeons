import game from '../game';

export class Curtain extends Phaser.Image {
    constructor() {
        super(game, game.width/2, 0, 'transition');
        game.stage.addChild(this);
        this.anchor.set(0.5, 0);
        this.falling = false;
        this.newState = 'menu';
    }

    update() {
        this.y += game.time.elapsedMS*2;
        if (this.falling && this.y >= 0) {
            game.state.start(this.newState);
            this.falling = false;
        }
    }

    raise() {
        this.y = game.height;
        this.angle = 180;
    }

    transition(newState) {
        this.newState = newState;
        this.falling = true;
        this.y = -1000;
        this.angle = 0;
    }
}