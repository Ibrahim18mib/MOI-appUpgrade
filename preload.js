const { contextBridge, ipcRenderer } = require("electron/renderer");
console.log("Preload check...");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateCounter: (callback) =>
    ipcRenderer.on("update-counter", (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send("counter-value", value),
  updateMessage: (data) => { ipcRenderer.send("update-message",data) }
});

// contextBridge.exposeInMainWorld("actions", {
//   minimize: () => {
//     ipcRenderer.invoke("minimize-window");
//   },
//   maximize: () => {
//     ipcRenderer.invoke("maximize-window");
//   },
//   openFile: () => ipcRenderer.invoke('dialog:openFile'),

//   close: () => {
//     ipcRenderer.invoke("close-window");
//   },
//   updateMessage: (data) => {
//     ipcRenderer.send("From-preload-to-app", () => {
//       console.log("in the Preload.js", data);
//     });
//   },

//   // updateMessage: (callback) => {ipcRenderer.on('appUpdater',(event, message) => {
//   //     console.log(message)
//   // })}
// });

////renderer,process

window.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  ipcRenderer.on("update-counter", (_event, value) => {
    console.log("checking value", value);
    let counter1 = value + 2;
    console.log("checking value -> ", counter1);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const Upp = document.getElementsByClassName("btnUpgrade");
  ipcRenderer.on("update-message", (_event, value) => {
    console.log("checking upp1", value);
  });
});

//IPC renderer process
ipcRenderer.on("sending-to-preload", (event, data) => {
  // Forward data to the renderer process through the context bridge
  console.log("123", data);
  window.actions.updateMessage("renderer to bridge", data);
});

// Function to handle the message received from the main process
window.handleMessage = (message) => {
  console.log("Message from main process:", message);
};
