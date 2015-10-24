const packager = require('electron-packager');
const appInfo = require('./app/package.json');

const opts = {
	dir: './app',
	name: appInfo.name,
	platform: 'linux',
	arch: 'x64',
	version: '0.33.8'
}

packager(opts, function done (err, appPath) {
    if(err) {
    	console.log(err);
    } else {
    	console.log(appPath);
    }
})