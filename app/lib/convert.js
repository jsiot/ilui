'use strict'

const img2lcd = require('img2lcd')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

function getHash (filepath) {
  let uname = path.basename(filepath)
  let hashname = `${crypto.createHash('md5').update(uname).digest('hex')}.h`
  let tmppath = path.join(os.tmpdir(), hashname)
  return tmppath
}

exports.convert = (path) => {
  return new Promise((resolve, reject) => {
    img2lcd.convert(path, (err, hex) => {
      if (err) {
        reject(err)
      } else {
        let content = `unsigned char img[] = {${hex}}`
        let tmppath = getHash(path)

        fs.writeFile(tmppath, content, (err) => {
          err ? reject(err) : resolve({path: tmppath, content: hex})
        })
      }
    })
  })
}
