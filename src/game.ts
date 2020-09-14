import { LoadState } from './states/load';
import { MenuState } from './states/menu';
import { MainState } from './states/main';
import { ResultsState } from './states/results';
import { InfoBox } from './objects/infoBox';
import { Curtain } from './objects/curtain';
import { MenuArrow, MenuButton } from './objects/buttons';

export interface DotDungeons extends Phaser.Game {
    data?: any,
    sfx?: any,
    tutorial?: any[],
    levels?: any,
    menuX?: number,
    menuY?: number,
    soundButton?: MenuButton,
    curtain?: Curtain;
    room?: number,
    mode?: string,
    currentLevel?: string,
    infoBox?: InfoBox,
    world1arrows?: MenuArrow[];
    world2arrows?: MenuArrow[];
    world3arrow?: MenuArrow;
    onesCaptured?: number;
    twosCaptured?: number;
    threesCaptured?: number;
    overlay?: Phaser.TileSprite;
    justCompleted?: string;
}

var game: DotDungeons = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('main', MainState);
game.state.add('results', ResultsState);



game.state.start('load');

export default game;