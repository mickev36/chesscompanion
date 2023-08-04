import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
//const exePath = '/home/mickev/dev/chesscompanion/stockfish/stockfish-ubuntu-20.04-x86-64-modern';
const exePath = '/home/mickev/dev/chesscompanion/stockfish/test.txt';
let engine;

const resultEmitter = new EventEmitter();

export async function initEngine() {
    engine = new Engine(exePath);
    try {
        await engine.init();
        await engine.setoption('MultiPV', '3');
        await engine.isready();
        //console.log("engine ready", engine.id, engine.options);
    } catch (e) {
        console.log('Error loading analysis engine');
    }
}

export async function engineEval(FEN) {
    engine.stop();
    engine.ucinewgame();
    await engine.position(FEN);
    const engineOutput = engine.goInfinite();

    let resultData = [];

    engineOutput.on('data', data => {
        if (data.multipv) {
            if (data.multipv == 1) {
                resultEmitter.emit('data', resultData);
                resultData = [data];
            } else {
                resultData.push(data);
            }
        }
    });
    return resultEmitter;
}

export function engineStop() {
    engine.stop();
}

export async function quitEngine() {
    await engine.quit();
}
