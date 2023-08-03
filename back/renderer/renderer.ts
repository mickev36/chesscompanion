import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

export let rendererWindow;

export function createWindow() {
    rendererWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/../preload.js'), // use a preload script
        },
    });

    if (isDev) {
        rendererWindow.webContents.openDevTools();
        rendererWindow.loadURL('http://localhost:3000');
    } else {
        rendererWindow.loadFile(__dirname + '/../front/index.html');
    }
}
