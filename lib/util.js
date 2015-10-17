'use strict';

var dialog = require('dialog');
var fs = require('fs');
var os = require('os');

exports.saveFile = function(src, cb){
	dialog.showSaveDialog({title: 'Save Hex File', defaultPath: os.homedir()},function(filename){
	  if(filename === undefined) return;
      fs.createReadStream(src).pipe(fs.createWriteStream(filename));
      console.log('save to '+filename);
      cb(filename);
	})
}

exports.openFile = function(cb) {
	dialog.showOpenDialog({ 
		filters: [ { name: 'Images', extensions: ['jpg', 'png', 'bmp'] }],
		properties: ['openFile'],
		title: 'Open Image File',
		defaultPath: os.homedir()
	}, function(filename){
       if(filename != undefined){
         console.log(filename);
         cb(filename);
       }
	});
}