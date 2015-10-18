'use strict';

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();
var template = [
	{ label: 'Help', submenu: [
	   { label: 'Documentation',
	     click: () => {
           require('shell').openExternal('https://github.com/jsiot/img2lcdui');
	     }
	   },
	   { label: 'Developer',
		 click: () => {
		   console.log('Not implemented yet');
		 }
	   },
	   { label: 'Feedback',
         click: () => {
           require('shell').openExternal('https://github.com/jsiot/img2lcdui/issues');
         }
	   },
	   { label: 'Exit',
	     click: () => {
           remote.require('app').quit();
	     }
	   }
	]}
]

menu = Menu.buildFromTemplate(template);
//Menu.setApplicationMenu(menu);