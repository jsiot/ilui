'use strict'

const dialog = require('dialog')
const fs = require('fs')
const os = require('os')

exports.saveFile = (src, cb) => {
  dialog.showSaveDialog({title: 'Save Hex File', defaultPath: os.homedir()}, (filename) => {
    if (filename === undefined) return
    fs.createReadStream(src).pipe(fs.createWriteStream(filename))
    cb(filename)
  })
}

exports.openFile = (cb) => {
  dialog.showOpenDialog({filters: [{ name: 'Images', extensions: ['jpg', 'png', 'bmp'] }],
    properties: ['openFile'],
    title: 'Open Image File',
    defaultPath: os.homedir()
  }, (filename) => {
    if (filename !== undefined) {
      cb(filename)
    }
  })
}

exports.savePref = (prefs, cb) => {

}
