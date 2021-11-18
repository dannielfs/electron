const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require("electron");
const data = require('./data');
const templateGenerator = require('./template');

let sobreWindow = null;
let tray = null;
let mainWindow = null;

app.on("ready", () => {
  console.log('Electron started');

  mainWindow = new BrowserWindow({
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
  let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal)

  globalShortcut.register('CmdOrCtrl+Shift+J', () => {
    mainWindow.send('atalho-iniciar-parar');
  })
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.openDevTools();
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

ipcMain.on('curso-adicionado', (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
})
