import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
import { getConfig, updateRendererConfig } from '../config/config';
import { rendererWindow } from '../renderer/renderer';
let engine;

let engineOutputEmitter: EventEmitter;

export let engineStatus = false;

export async function initEngine() {
    engineStatus = false;
    if (engineStatus) await engine.quit();
    const engineExePath = getConfig().enginePath;
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
    try {
        await engineStop();
    } catch (e) {}

    engine.ucinewgame();
    await engine.position(FEN);
    engineOutputEmitter = engine.goInfinite();

    let resultData = [];

    engineOutputEmitter.on('data', data => {
        if (data.multipv) {
            if (data.multipv == 1) {
                rendererWindow.send('engineData', resultData);
                resultData = [data];
            } else {
                resultData.push(data);
            }
        }
    });
}

export async function engineStop() {
    await engine.stop();
    engineOutputEmitter.removeAllListeners();
}

export async function quitEngine() {
    await engine.quit();
}
