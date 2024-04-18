const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('actions',{
    minimize: () => { ipcRenderer.invoke('minimize-window') },
    maximize: () => { ipcRenderer.invoke('maximize-window') },
    close: () => { ipcRenderer.invoke('close-window') }
})