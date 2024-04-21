// implementations of app functions,passing to preload.js etc...
/// modules
const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class MainScreen {
 window;

 position = {
    width:1000,
    height: 800,
    maximized: false


 }




  showMessage(message) {
    console.log("show message trigger");
    console.log(message);
  }
}
