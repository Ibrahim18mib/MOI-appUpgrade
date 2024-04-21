//Electron-Updater Module 
const {autoUpdater } = require('electron-updater');

//enable autoudate debugger
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"


module.exports = () => {
//check update (GH rele)
autoUpdater.checkForUpdates();
}