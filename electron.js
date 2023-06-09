const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, `${(process.env.NODE_ENV == 'dev' ? '' : '../')}preload.js`)
    }
  });

  win.loadFile('www/index.html');
  win.maximize();
  win.setMenuBarVisibility(false)
  win.webContents.openDevTools();

  ipcMain.on('fullscreen-window', () => {
      win.setFullScreen(!win.isFullScreen())
  })
}

app.whenReady().then(createWindow);
