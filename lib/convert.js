'use strict';

var img2lcd = require('img2lcd');
var os = require('os');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

function getHash(filepath){
	var uname = path.basename(filepath);
	var hashname = crypto.createHash('md5').update(uname).digest('hex')+'.h';
    
    // path.join error
    var tmppath = os.tmpdir()+'/'+hashname;
    return tmppath;
}

exports.convert = function(path, callback) {
  img2lcd.convert(path, function(err, hex){
    if(!err) {
      var tmppath = getHash(path)
      fs.writeFile(tmppath, hex, function(err){
      	if(err) { 
      		console.log(err);
      		callback(err, null);
      	} else {
      		callback(null, tmppath);
      	}
      })
    }
  });   
}
