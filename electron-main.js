const { app, BrowserWindow, ipcMain, Menu } = require("electron/main");
const path = require("node:path");
const isDev = process.argv.includes("--dev");
const updater = require("./updater");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //atrt
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
  //end

  mainWindow.loadFile(path.join(__dirname, "./index.html"));

  // if (isDev) {
  //   mainWindow.loadURL("http://localhost:4200/home");
  // } else {
  //   mainWindow.loadFile(
  //     path.join(__dirname, "/dist/moi-web/index.html")
  //   );
  // }
}

app.whenReady().then(() => {
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  ipcMain.on("update-message", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPCMain handlers
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

ipcMain.handle("app-Updater", () => {
  mainWindow.webContents.send(
    "sending to the preload...",
    "Data to send to preload"
  );
});
