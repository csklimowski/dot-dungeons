import game from '../game';

class MapTile extends Phaser.Sprite {
    constructor(x, y, type) {
        super(game, x, y, 'map-tile');
        this.type = type;
    }
}

export function buildLevelMap(source) {
    let map = [];
    for (let y = 0; y < source.length; y++) {
        let row = [];
        for (let x = 0; x < source[x].length; x++) {
            if (source[y][x] === ' ') {
                row.push(null);
            } else if (source[y][x] === 'n') {
                row.push(new MapTile(40*x, 40*y, 0));
                map.startX = x;
                map.startY = y;
            } else if (source[y][x] === 'x') {
                row.push(new MapTile(40*x, 40*y, 0));
                map.endX = x;
                map.endY = y;
            } else {
                row.push(new MapTile(40*x, 40*y, Number.parseInt(source[y][x])));
            }
        }
        map.push(row);
    }
    return map;
}

export function buildProceduralMap(map) {
    let currentX = 7, currentY = 5, nextX = 7, nextY = 5, squares = 50;
    while (squares > 0) {
        let direction = Math.floor(Math.random() * 4);
        while (map[nextY][nextX].type !== 0) {
            if (direction === 0 && nextX < map[nextY].length - 2) {
                nextX++;
            } else if (direction === 1 && nextY < map.length - 2) {
                nextY++;
            } else if (direction === 2 && nextX > 2) {
                nextX--;
            } else if (direction === 3 && nextY > 2) {
                nextY--;
            } else {
                break;
            }
        }
        map[nextY][nextX].type = 1;
        currentX = nextX;
        currentY = nextY;
        squares--;
    }
    
    for (let y = 1; y < map.length - 1; y++) {
        for (let x = 1; x < map[y].length - 1; x++) {
            if (map[y][x].type === 1 && Math.random() > 0.5) {
                let adjacent = 0;
                for (let y2 = -1; y2 < 2; y2++) {
                    for (let x2 = -1; x2 < 2; x2++) {
                        if (map[y+y2][x+x2].type === 1) {
                            adjacent++;
                        }
                    }
                }
                if (adjacent > 7) {
                    map[y][x].type = 4;
                } else if (adjacent > 6) {
                    map[y][x].type = 3;
                } else if (adjacent > 5) {
                    map[y][x].type = 2;
                }
            }
        }
    }
    
    for (let y = 1; y < map.length - 1; y++) {
        for (let x = 1; x < map[y].length - 1; x++) {
            let adjacent = 0;
            for (let y2 = -1; y2 < 2; y2++) {
                for (let x2 = -1; x2 < 2; x2++) {
                    if (map[y+y2][x+x2].type !== 0) {
                        adjacent++;
                    }
                }
            }
            if (adjacent < 3 && currentX !== x && currentY !== y) {
                map[y][x].type = 0;
            }
        }
    }
    
    for (let y = map.length - 2; y > 0; y--) {
        for (let x = map[y].length - 2; x > 0; x--) {
            let adjacent = 0;
            for (let y2 = -1; y2 < 2; y2++) {
                for (let x2 = -1; x2 < 2; x2++) {
                    if (map[y+y2][x+x2].type !== 0) {
                        adjacent++;
                    }
                }
            }
            if (adjacent < 3 && currentX !== x && currentY !== y) {
                map[y][x].type = 0;
            }
        }
    }
}