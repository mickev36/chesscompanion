import { app, BrowserWindow } from 'electron';
import { initApi } from './back/api/api';
import { initDbConnection } from './back/db/dbConnection';
import isDev from 'electron-is-dev';
import electronReload from 'electron-reload';
import path from 'path';
import { ipcRenderer } from 'electron';

if (isDev) {
    electronReload(__dirname, {
        electron: __dirname + '/../../node_modules/.bin/electron',
    });
}

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/back/preload.js'), // use a preload script
        },
    });

    if (isDev) {
        win.webContents.openDevTools();
        win.loadURL('http://localhost:3000');
    } else {
        win.loadFile(__dirname + '/../front/index.html');
    }
};

app.whenReady().then(async () => {
    createWindow();
    await initDbConnection();
    await initApi(win);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
