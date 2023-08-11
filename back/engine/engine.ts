import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
import { getConfig, updateRendererConfig } from '../config/config';
import { rendererWindow } from '../renderer/renderer';

let engine;
let engineOutputEmitter: EventEmitter;

const defaultEngineConfig = {
    status: false,
    name: null,
};

export let engineConfig = { ...defaultEngineConfig };

export async function initEngine() {
    engineConfig = { ...defaultEngineConfig };
    if (engineConfig.status) await engine.quit();
    const engineExePath = getConfig().engine.path;

    try {
        if (!engineExePath) throw 'No engine path';
        engine = new Engine(engineExePath);
        await engine.init();
        await engine.setoption('MultiPV', '3');
        await engine.isready();
        engineConfig.status = true;
        engineConfig.name = engine.id.name;
        //console.log("engine ready", engine.id, engine.options);
    } catch (e) {
        console.log('Error loading analysis engine : ' + e);
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
