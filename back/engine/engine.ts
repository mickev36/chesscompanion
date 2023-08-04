import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
import { getConfig, updateRendererConfig } from '../config/config';
let engine;

const resultEmitter = new EventEmitter();

export let engineStatus = false;

export async function initEngine() {
    const engineExePath = getConfig().enginePath;
    engineStatus = false;
    engine = new Engine(engineExePath);
    try {
        await engine.init();
        await engine.setoption('MultiPV', '3');
        await engine.isready();
        engineStatus = true;
        //console.log("engine ready", engine.id, engine.options);
    } catch (e) {
        console.log('Error loading analysis engine');
    } finally {
        updateRendererConfig();
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
