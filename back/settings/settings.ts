import Store from 'electron-store';
import { Settings } from '../types/types';

const store = new Store();

export function getSettings() {
    return store.get('settings') as Settings;
}

export function setSettings(newSettings: Settings) {
    const currentSettings = store.get('settings') as Settings;
    store.set({ ...currentSettings, ...newSettings });
}
