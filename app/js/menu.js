'use strict'

var remote = require('remote')
var Menu = remote.require('menu')
var info = require('./package.json')

var menu = new Menu()
var template = [
  { label: 'Help', submenu: [
      { label: 'Documentation',
        click: () => {
          require('shell').openExternal('https://github.com/jsiot/ilui')
        }
      },
      { label: 'Developer',
        click: () => {
          remote.require('dialog').showMessageBox({
            message: `${info.name} v${info.version}\n${info.description}\nby ${info.author}`,
            buttons: ['OK']
          })
        }
      },
      { label: 'Feedback',
        click: () => {
          require('shell').openExternal('https://github.com/jsiot/ilui/issues')
        }
      },
      { label: 'Exit',
        click: () => {
          remote.require('app').quit()
        }
      }
  ]}
]

menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
