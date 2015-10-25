'use strict'

const packager = require('electron-packager')
const appInfo = require('./app/package.json')
const path = require('path')
const rmdir = require('rmdir')
const fs = require('fs')
const machine = require('./platform.json')
const targz = require('tar.gz')

const opts = {
  dir: './app',
  name: appInfo.name,
  platform: machine.platform,
  arch: ['x64'],
  version: '0.33.8',
  out: './dist'
}

packager(opts, (err, appPath) => {
  if (err) {
    console.log(err)
  } else {
    for (let i in opts.platform) {
      const name = `${opts.name}-${opts.platform[i]}-${opts.arch[0]}`
      const build_path = path.join(__dirname, opts.out, name)
      const lpath = path.join(build_path, 'resources')
      const default_app = path.join(lpath, 'default_app')

      fs.readdir(default_app, (err, files) => {
        if (!err) {
          rmdir(default_app, (err, dirs, files) => {
            if (err) {
              console.log(err)
            } else {
              console.log('Cleanup default_app done')
            }
          })
        }
      })

      let read = targz().createReadStream(build_path)
      read.pipe(fs.createWriteStream(path.join(__dirname, 'release', `${name}.tar.gz`)))
    }
  }
})
