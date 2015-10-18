var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();
var template = [
	{ label: 'Help', submenu: [
	   { label: 'Documentation',
	     click: function(){
           require('shell').openExternal('https://github.com/jsiot/img2lcdui');
	     }
	   },
	   { label: 'Developer',
		 click: function(){
		   
		 }
	   },
	   { label: 'Feedback',
         click: function(){
           require('shell').openExternal('https://github.com/jsiot/img2lcdui/issues');
         }
	   },
	   { label: 'Exit',
	     click: function(){
           remote.require('app').quit();
	     }
	   }
	]}
]

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);