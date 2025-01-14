const { contextBridge, ipcRenderer, webUtils } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
    call: ipcRenderer.invoke,
    onEngineMessage: callback => ipcRenderer.on('engineData', callback),
    onConfig: callback => ipcRenderer.on('config', callback),
    getPathForFile: webUtils.getPathForFile
});
