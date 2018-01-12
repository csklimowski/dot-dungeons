import game from '../game';

class MapTile extends Phaser.Sprite {
    constructor(x, y, type) {
        super(game, x, y, 'map-tile');
        game.add.existing(this);

        this.anchor.set(0.5);
        this.type = type;
        this.frame = type;
        this.visited = false;
        this.initialType = type;
    }
}

export function buildLevelMap(source) {
    let layout = source.layout;
    let map = [];
    map.remaining = 0;
    for (let y = 0; y < layout.length; y++) {
        let row = [];
        for (let x = 0; x < layout[y].length; x++) {
            if (layout[y][x] === ' ') {
                row.push(null);
            } else if (layout[y][x] === 'N') {
                row.push(new MapTile(40*x, 50+ 40*y, 0));
                map.startX = x;
                map.startY = y;
            } else if (layout[y][x] === 'X') {
                row.push(new MapTile(40*x, 50 + 40*y, 6));
                map.endX = x;
                map.endY = y;
            } else {
                let type = Number.parseInt(layout[y][x]);
                row.push(new MapTile(40*x, 50 + 40*y, type));
                map.remaining += type;
            }
        }
        map.push(row);
    }
    return map;
}

export function buildProceduralMap() {
    let source;
    let error = false;
    do {
        source = [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ];
        let currentX = 1, currentY = 3, path = [], squares = 20, charge = 0;
        source[currentY][currentX] = 'N';
    
        while (true) {
            path.push({x: currentX, y: currentY});
            let validMoves = [];
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (!(x === 0 && y === 0) && currentX + x > 0 && currentY + y > 0 && currentX + x < 13 && currentY + y < 6) {
                        let valid = true;
                        for (let i = 0; i < path.length - 1; i++) {
                            if (path[i].x   === currentX     && path[i].y   === currentY &&
                                path[i+1].x === currentX + x && path[i+1].y === currentY + y) {
                                valid = false;
                                break;
                            }
                            if (path[i].x   === currentX + x && path[i].y   === currentY + y &&
                                path[i+1].x === currentX     && path[i+1].y === currentY) {
                                valid = false;
                                break;
                            }
                        }
                        if (valid) validMoves.push({x, y});
                    }
                }
            }
            if (validMoves.length === 0) {
                error = true;
                break;
            }
            let nextMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            currentX += nextMove.x;
            currentY += nextMove.y;
    
            if (source[currentY][currentX] === ' ') {
                if (squares < 0) {
                    source[currentY][currentX] = 'X';
                    break;
                }
                source[currentY][currentX] = '' + charge;
                charge = 0;
            } else {
                charge++;
            }
            squares--;
        }
    } while (error);
    
    return {
        id: 'Procedural Level',
        name: 'Different Every Time!',
        layout: source
    }
}