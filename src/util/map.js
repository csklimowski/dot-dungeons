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
    let source = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ];
    let currentX = 1, currentY = 3, nextX = 1, nextY = 3, squares = 30;
    source[currentY][currentX] = 'N';
    while (squares > 0) {
        let direction = Math.floor(Math.random() * 5);
        while (source[nextY][nextX] !== ' ') {
            if (direction <= 1 && nextX < source[nextY].length - 2) {
                nextX++;
            } else if (direction === 2 && nextY < source.length - 2) {
                nextY++;
            } else if (direction === 3 && nextX > 1) {
                nextX--;
            } else if (direction === 4 && nextY > 1) {
                nextY--;
            } else {
                break;
            }
        }
        if (source[nextY][nextX] === ' ') {
            source[nextY][nextX] = '0';
            squares--;
        }
        currentX = nextX;
        currentY = nextY;
    }
    source[currentY][currentX] = 'X';
    
    for (let y = 1; y < source.length - 1; y++) {
        for (let x = 1; x < source[y].length - 1; x++) {
            if (source[y][x] === '0' && Math.random() > 0.5) {
                let adjacent = 0;
                for (let y2 = -1; y2 < 2; y2++) {
                    for (let x2 = -1; x2 < 2; x2++) {
                        if (source[y+y2][x+x2] === '0') {
                            adjacent++;
                        }
                    }
                }
                if (adjacent > 7) {
                    source[y][x] = '3';
                } else if (adjacent > 6) {
                    source[y][x] = '2';
                } else if (adjacent > 5) {
                    source[y][x] = '1';
                }
            }
        }
    }
    
    for (let y = 1; y < source.length - 1; y++) {
        for (let x = 1; x < source[y].length - 1; x++) {
            let adjacent = 0;
            for (let y2 = -1; y2 < 2; y2++) {
                for (let x2 = -1; x2 < 2; x2++) {
                    if (source[y+y2][x+x2] !== ' ') {
                        adjacent++;
                    }
                }
            }
            if (adjacent < 3 && currentX !== x && currentY !== y) {
                source[y][x] = ' ';
            }
        }
    }
    
    for (let y = source.length - 2; y > 0; y--) {
        for (let x = source[y].length - 2; x > 0; x--) {
            let adjacent = 0;
            for (let y2 = -1; y2 < 2; y2++) {
                for (let x2 = -1; x2 < 2; x2++) {
                    if (source[y+y2][x+x2] !== ' ') {
                        adjacent++;
                    }
                }
            }
            if (adjacent < 3 && currentX !== x && currentY !== y) {
                source[y][x] = ' ';
            }
        }
    }

    return {
        id: 'Procedural Level',
        name: 'Different Every Time!',
        layout: source
    }
}