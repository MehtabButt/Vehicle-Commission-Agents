'use strict';

require('./models');
const { app, session, protocol, BrowserWindow, ipcMain } = require('electron');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const db = require('./models/index.js');
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const os = require('os');
const routes = require('./routes.js');
const dotenv = require('dotenv');

dotenv.config();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      // __static is set by webpack and will point to the public directory
      preload: path.resolve(__static, 'preload.js')
    }
  });
  win.maximize();
  win.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadFile('index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      const vueJs3 = path.join(os.homedir(), '.config/google-chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0');
      await session.defaultSession.loadExtension(vueJs3);
      console.log('vue js 3 extension added');
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  db.sequelize
    .sync({ alter: false })
    .then(() => {
      console.log('db is sync now');
    })
    .catch(err => {
      console.log('db failed to sync', err);
    });
  routes(ipcMain);
  createWindow();
});
// app.on('ready', createWindow());

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
