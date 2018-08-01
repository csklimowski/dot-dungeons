import game from '../game';

import { Dot } from '../objects/dot';

export function realX(x) { return 250 + 100*x; }
export function realY(y) { return 100 + 100*y; }

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
                if (dot.hasNumber) map.remaining ++;
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

export function buildProceduralMap(difficulty) {
    let maxDots = Math.min(20, 7 + difficulty);
    let minNumbers = Math.min(15, 2 + difficulty);
    let source, error;
    let tries = 0;
    
    do {
        tries++;
        error = false;
        source = [
            Array(9).fill(' '),
            Array(9).fill(' '),
            Array(9).fill(' '),
            Array(9).fill(' '),
            Array(9).fill(' '),
            Array(9).fill(' '),
            Array(9).fill(' ')
        ];

        let forbidden = {};
        for (let i = 1; i < 8; i++) {
            forbidden[i] = 1 + Math.floor(Math.random()*5);
        }

        let currentX = 1 + Math.floor(Math.random()*7);
        let currentY = 1 + Math.floor(Math.random()*5);
        let path = [], dots = 0, charge = 0, total = 0;
        source[currentY][currentX] = 'N';
    
        while (true) {
            path.push({x: currentX, y: currentY});
            let validMoves = [];
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (!(x === 0 && y === 0) && 
                        currentX + x > 0 && currentY + y > 0 && 
                        currentX + x < 8 && currentY + y < 6 &&
                        forbidden[currentX + x] !== currentY + y) {
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
                if (total >= minNumbers) {
                    source[currentY][currentX] = 'X';
                    break;
                }
                if (charge < 4) {
                    source[currentY][currentX] = '' + charge;
                    total += charge;
                } else {
                    source[currentY][currentX] = '0';
                }
                dots++;
                if (dots > maxDots) {
                    error = true;
                    break;
                }
                charge = 0;
            } else {
                charge++;
            }
        }
    } while (error);

    console.log(tries);
    
    return {
        layout: source
    }
}