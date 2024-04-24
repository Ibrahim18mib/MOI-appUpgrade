console.log("Preload Module");

const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("actions", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  updateMessage: () => ipcRenderer.invoke("update-detect"),
  onUpdateCounter: (recCallback) =>
    ipcRenderer.on("update-counter", (_event, value) => recCallback(value)),
  setNum: (info) => {
    ipcRenderer.invoke("set-num", info);
  },
});
