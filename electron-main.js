const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron/main");
const path = require("node:path");
const isDev = process.argv.includes("--dev");
const updater = require("./updater");
const { setTimeout } = require("node:timers/promises");

// Check if the application is packed and dev update config is forced
const skipUpdateCheck = false;

//csp disabled
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow;

//Asynchronous User Selected file open

async function handleFileOpen() {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"], // Specify the dialog type (in this case, to open a file)
      // Add any additional options as needed
    });

    // Check if the dialog was canceled
    if (!canceled && filePaths && filePaths.length > 0) {
      const filePath = filePaths[0]; // Get the first selected file path
      console.log(filePath);
      return filePath;
    } else {
      console.log("File dialog canceled");
      return null; // Return null if the dialog was canceled or no file was selected
    }
  } catch (error) {
    console.error("Error opening file dialog:", error);
    return null; // Return null in case of error
  }
}

//Handling Title NAme:
function handleSetTitle(event, name) {
  //set title
  console.log("IPCMAin listening set-title channel");
  const webCont = event.sender;
  console.log("this is event.sender", webCont);
  const win = BrowserWindow.fromWebContents(webCont);
  console.log("this is BrowserWindow.fromWebContents(webCont) ", win);

  console.log("this is given name1: ", name);
}

//HhandleUpgrade app auto-update
function handleUpgrade() {
  console.log("IPC MAIN Listening in update-detect");
}

function createWindow() {
  ///updater calling after 3s
  setTimeout(() => {
    updater();
  }, 1500);

  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 600,
    height: isDev ? 800 : 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ///menu
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => mainWindow.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
  ///menu end

  if (isDev) {
    mainWindow.loadURL("http://localhost:4200/home");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "./index.html"));
  }

  // mainWindow.loadFile(path.join(__dirname, "./index.html"));
}
// new window create END

/// APP Listeners, Handlers
app.on("ready", () => {
  console.log("App is in Ready mode");
});

app.whenReady().then(() => {
  console.log("App is in When REady mode");
  ipcMain.on("set-title", handleSetTitle);
  createWindow();
});

app.on("window-all-closed", () => {
  console.log("App is in window-all-closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  console.log("before-quitting check any to delete");
});

// IPCMain handlers, Listeners

ipcMain.handle("set-num", (event, value) => {
  console.log("fianlvalue", value);
});

ipcMain.handle("dialog:openFile", handleFileOpen);

ipcMain.handle("minimize-window", () => {
  mainWindow.minimize();
});

ipcMain.handle("maximize-window", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.handle("close-window", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle("update-detect", async () => {
  handleUpgrade();
});
