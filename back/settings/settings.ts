import Store from 'electron-store';
import { Settings } from '../../common/types/types';
import { rendererWindow } from '../renderer/renderer';

const store = new Store();

export function getSettings() {
    const storedSettings = store.get('settings') as Settings;
    return storedSettings || {};
}

export function setSettings(newSettings: Settings) {
    const currentSettings = store.get('settings') as Settings;
    const mergedSettings = { ...currentSettings, ...newSettings };
    store.set('settings', mergedSettings);
    rendererWindow.send('settings', mergedSettings);
}
