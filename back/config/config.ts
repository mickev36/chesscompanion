import Store from 'electron-store';
import { Settings } from '../../common/types/types';
import { engineConfig } from '../engine/engine';
import { rendererWindow } from '../renderer/renderer';
import _ from 'lodash';

const store = new Store();

export function getConfig() {
    return generateConfig();
}

export function setSettings(newSettings: Settings) {
    const settings = store.get('settings') as Settings;
    _.merge(settings, newSettings);
    store.set('settings', settings);
    updateRendererConfig();
}

export function updateRendererConfig() {
    if (rendererWindow) rendererWindow.send('config', generateConfig());
}

function generateConfig() {
    const settings = store.get('settings') as Settings;
    _.merge(settings, {
        engine: engineConfig,
    });

    return settings;
}
