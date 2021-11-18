const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require('./data');
const templateGenerator = require('./template');

let sobreWindow = null;
let tray = null;

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

  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  let template = templateGenerator.geraTrayTemplade(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);
  
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  console.log('Electron started');
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("abrir-janela-sobre", () => {

  if (sobreWindow == null){

    sobreWindow = new BrowserWindow({
      width: 300,
      height: 205,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    }); 

    sobreWindow.on('closed', () => {
      sobreWindow = null;
    })
  }

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempo) => {
  debugger
  data.salvaDados(curso, tempo);
});
