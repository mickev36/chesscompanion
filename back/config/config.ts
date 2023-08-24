import Store from 'electron-store';
import { Settings, SettingsOverride } from '../../common/types/types';
import { engineConfig } from '../engine/engine';
import { rendererWindow } from '../renderer/renderer';
import _ from 'lodash';

const store = new Store();


//Create configuration object if none exists
export function initConfig() {
    const settings = store.get('settings') as Settings;
    if(!settings) store.set('settings', {})
}

export function getConfig() {
    return generateConfig();
}

export function setSettings(newSettings: SettingsOverride) {
    const settings = store.get('settings') as Settings;
    _.merge(settings, newSettings);
    store.set('settings', settings);
    updateRendererConfig();
}

export function updateRendererConfig() {
    if (rendererWindow) rendererWindow.send('config', generateConfig());
}

function generateConfig() {
    let settings = store.get('settings') as Settings;
    if(!settings) settings = {
        engine: {
            analysisLineCount: 3
        }
    }
    _.merge(settings, {
        engine: engineConfig,
    });

    return settings;
}
