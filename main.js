const { app, BrowserWindow } = require('electron');


app.on('ready', () => { 
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });
    mainWindow.loadURL('https://www.alura.com.br')
});