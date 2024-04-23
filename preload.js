console.log("Preload Module");

const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("actions", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  updateMessage: () =>
    ipcRenderer.invoke("update-detect"),
});
