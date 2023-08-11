import Store from 'electron-store';
import { AppConfig, Settings } from '../../common/types/types';
import { engineStatus } from '../engine/engine';
import { rendererWindow } from '../renderer/renderer';

const store = new Store();

export function getConfig() {
    return generateConfig();
}

export function setSettings(newSettings: Settings) {
    const currentSettings = store.get('settings') as Settings;
    const mergedSettings = { ...currentSettings, ...newSettings };
    store.set('settings', mergedSettings);
    updateRendererConfig();
}

export function updateRendererConfig() {
    if (rendererWindow) rendererWindow.send('config', generateConfig());
}

function generateConfig() {
    const storedSettings = store.get('settings') as Settings;

    const config: AppConfig = { ...storedSettings, engineStatus };

    return config;
}
