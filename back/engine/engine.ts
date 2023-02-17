import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
const exePath = '/home/mickev/dev/chesscompanion/stockfish/stockfish-ubuntu-20.04-x86-64-modern';
const engine = new Engine(exePath);

const resultEmitter = new EventEmitter();

export async function initEngine() {
    await engine.init();
    await engine.setoption('MultiPV', '3');
    await engine.isready();
    //console.log("engine ready", engine.id, engine.options);
}

export async function engineEval(FEN) {
    //TODO : stop previous eval
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

export function stopAnalyzing() {
    engine.stop();
}

export async function quitEngine() {
    await engine.quit();
}
