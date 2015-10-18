'use strict';

const app = require('app'); 
const BrowserWindow = require('browser-window');
const info = require('./package.json');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 510,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    title: info.name +' v'+info.version
  });

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => mainWindow = null);
});