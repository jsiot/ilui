'use strict';

var dialog = require('dialog');
var fs = require('fs');

exports.saveFile = function(src, cb){
	dialog.showSaveDialog(function(filename){
      fs.createReadStream(src).pipe(fs.createWriteStream(filename));
      console.log('save to '+filename);
      cb(filename);
	})
}