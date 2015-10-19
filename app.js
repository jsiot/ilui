'use strict';

const app = require('app'); 
const BrowserWindow = require('browser-window');
const info = require('./package.json');
const prefs = require('./lib/prefs.js');

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => { 
  
  var wstate = prefs.get('windowState');

  if(wstate === null){
    wstate = {
      width: 640,
      height: 510,
      maximized: false
    }
  }

  mainWindow = new BrowserWindow({
    width: wstate.width,
    height: wstate.height,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    title: info.name +' - '+info.description
  });

  if (wstate.maximized) {
    mainWindow.maximize();
  }

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  
  mainWindow.on('close', () => {
    let bounds = mainWindow.getBounds();
    prefs.set('windowState', {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      maximized: mainWindow.isMaximized()
    })
  });

  mainWindow.on('closed', () => mainWindow = null);
});