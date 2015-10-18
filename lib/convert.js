'use strict';

const img2lcd = require('img2lcd');
const os = require('os');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filepath){
	let uname = path.basename(filepath);
	let hashname = crypto.createHash('md5').update(uname).digest('hex')+'.h';  
    let tmppath = os.tmpdir()+'/'+hashname;
    return tmppath;
}

exports.convert = (path, callback) => {
  img2lcd.convert(path, (err, hex) => {
    if(!err) {
      let content = 'unsigned char img[] = {'+hex+'}';
      let tmppath = getHash(path);
      fs.writeFile(tmppath, content, (err) => {
      	if(err) { 
      		console.log(err);
      		callback(err, null);
      	} else {
      		callback(null, {path: tmppath, content: hex});
      	}
      })
    }
  });   
}