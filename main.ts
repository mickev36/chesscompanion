import { app, BrowserWindow } from 'electron';
import { initApi } from './back/api/api';
import { initDbConnection } from './back/db/dbConnection';
import isDev from 'electron-is-dev';
import electronReload from 'electron-reload';
import { createWindow } from './back/renderer/renderer';

if (isDev) {
    electronReload(__dirname, {
        electron: __dirname + '/../../node_modules/.bin/electron',
    });
}

app.whenReady().then(async () => {
    createWindow();
    await initDbConnection();
    await initApi();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
