const { app, BrowserWindow, ipcMain } = require("electron");

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("abrir-janela-sobre", () => {
  let sobreWindow = new BrowserWindow({
    width: 300,
    height: 200,
  });

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});
