import { Engine } from 'node-uci';
import { EventEmitter } from 'node:events';
import { getConfig, setSettings, updateRendererConfig } from '../config/config';
import { rendererWindow } from '../renderer/renderer';

let engine: Engine & {id?: { name: string; author: string } };
let engineOutputEmitter: EventEmitter;

const defaultEngineConfig = {
    status: false,
    name: null,
    isPondering: false
};

let currentFEN = '';

export let engineConfig = { ...defaultEngineConfig };

// setInterval(() => {
//     if(!engineOutputEmitter) console.log("No event emitter")
//     else console.log(engineOutputEmitter.listenerCount('data'))
// }, 500)

export async function initEngine() {
    engineConfig = { ...defaultEngineConfig };
    if (engineConfig.status) await engine.quit();
    
    const config = getConfig()
    const engineExePath = config.engine.path;
    const analysisLineCount = config.engine.analysisLineCount || 3

    try {
        if (!engineExePath) throw 'No engine path';
        engine = new Engine(engineExePath);
        await engine.init();
        await engine.setoption('MultiPV', analysisLineCount.toString());
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

export async function infiniteAnalysis(FEN, isNewGame) {
    try {
        await engineStop();
    } catch (e) {
        console.log(e)
    }

    if (isNewGame) {
        await engine.ucinewgame();
        await engine.position('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    }

    await engine.isready();
    await engine.position(FEN);
    currentFEN = FEN;
    engineOutputEmitter = engine.goInfinite({});
    engineConfig.isPondering = true;

    let resultData = [];
    engineOutputEmitter.on('data', data => {
        if (data.multipv) {
            if (data.multipv == 1 && resultData.length) { //A new evaluation is available
                rendererWindow.send('engineData', resultData);
                resultData = [data];
            } else {
                resultData.push(data);
            }
        }
    });
}

export async function setAnalysisLineCount(count: number) {
    setSettings({engine: {analysisLineCount: count}});
    await engine.setoption('MultiPV', count.toString());
}

export async function engineStop() {
    if(engineConfig.isPondering) {
        engineOutputEmitter.removeAllListeners('data');
        await engine.stop();
        engineConfig.isPondering = false;
    }

}

export async function quitEngine() {
    await engine.quit();
}
