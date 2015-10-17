var app = require('app'); 
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 300,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


