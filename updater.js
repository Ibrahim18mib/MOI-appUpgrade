//Electron-Updater Module
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

//enable autoudate debugger
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

//auto downl;oading disabled
autoUpdater.autoDownload = false;

module.exports = () => {
  //check update (GH release)
  console.log("Checking for update");
  
  autoUpdater.checkForUpdates();

  //listen for update found

  autoUpdater.on("update-available", () => {
    //prompt the user to start the download
    // autoUpdater.downloadUpdate()
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Available",
        message: "A new version detected,Would you like to Update now ?",
        buttons: ["Update", "No"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        //if button 0(update) pressed. strat the downloading
        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      });
  });

  //listen for downloaded update found

  autoUpdater.on("update-downloaded", () => {
    //prompt the user to install the update
    // autoUpdater.quitAndInstall()
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Ready",
        message: "Install and Restart Now.",
        buttons: ["Yes", "Later"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        //if button 0(Yes) pressed. Install and REstart
        if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
      });
  });
};
