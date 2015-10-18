'use strict';

var app = require('app'); 
var BrowserWindow = require('browser-window');
var mainWindow = null;
var info = require('./package.json');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 620,
    height: 500,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    title: info.name +' v'+info.version
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});