import { app, BrowserWindow } from 'electron';
import { initApi } from './back/api/api';
import { initDbConnection } from './back/db/dbConnection';
import isDev from 'electron-is-dev';
import electronReload from 'electron-reload';
import { createWindow } from './back/renderer/renderer';
import { initEngine } from './back/engine/engine';
import { initConfig } from './back/config/config';

if (isDev) {
    electronReload(__dirname, {
        electron: __dirname + '/../../node_modules/.bin/electron',
    });
    process.traceProcessWarnings = true
}

app.whenReady().then(async () => {
    initConfig()
    await initDbConnection();
    await initApi();
    await initEngine();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
