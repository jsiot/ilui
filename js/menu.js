var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var menu = new Menu();
menu.append(new MenuItem({ label: 'File', click: function() { alert('item 1 clicked'); } }));
menu.append(new MenuItem({ label: 'Tool', click: function() { console.log('item 1 clicked'); } }));
menu.append(new MenuItem({ label: 'About',  click: function() { console.log('item 1 clicked'); }}));

//Menu.setApplicationMenu(menu);