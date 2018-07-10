import game from '../game';

import { Dot } from '../objects/dot';

export function realX(x) { return 250 + 90*x; }
export function realY(y) { return 90 + 90*y; }

export function buildLevelMap(source) {
    let map = [];
    map.remaining = 0;

    let layout = source.layout;
    for (let y = 0; y < layout.length; y++) {
        let row = [];
        for (let x = 0; x < layout[y].length; x++) {
            let type = layout[y][x];

            if (type === ' ') {
                row.push(null);
            } else  {
                let dot = new Dot(realX(x), realY(y), type)
                if (dot.hasNumber) {
                    map.remaining += dot.number.value;
                }
                row.push(dot);
            }

            if (type === 'N') {
                map.startX = x;
                map.startY = y;
            }

            if (type === 'X') {
                map.endX = x;
                map.endY = y;
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
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ];
        let currentX = 1, currentY = 3, path = [], squares = 20, charge = 0;
        source[currentY][currentX] = 'N';
    
        while (true) {
            path.push({x: currentX, y: currentY});
            let validMoves = [];
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (!(x === 0 && y === 0) && currentX + x > 0 && currentY + y > 0 && currentX + x < 6 && currentY + y < 6) {
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