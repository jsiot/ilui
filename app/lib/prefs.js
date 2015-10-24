'use strict';

const app = require('app');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(app.getPath('userData'), 'prefs.json'); 

let data = null;

if (!fs.existsSync(dataFilePath)) {
  data = {};
  fs.writeFileSync(dataFilePath, JSON.stringify(data)); 
} else {
  data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
}

exports.set = (key, value) => {
  if(data !== null){
     data[key] = value; 	
  } else {
  	 data = {};
  	 data[key] = value;
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data)); 	
}

exports.get = (key) => {
  let value = null;
  data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
  if(key in data) {
  	value = data[key];
  }
  return value;
}
