(function(){
	'use strict';

  	var content = document.getElementById('main');
	var remote = require('remote').require('./lib/convert.js');
    
	document.addEventListener('dragover', function (e) {
		e.preventDefault();
	    return false;
	}, false);
	
	document.addEventListener('dragleave', function () {
	    return false;
	}, false);

    document.addEventListener('dragend', function(){
        return false;
    }, false)	

	document.addEventListener('drop' , function (e) {
	    e.preventDefault();
	    var file = e.dataTransfer.files[0];
	    remote.convert(file.path);
	    return false;
	}, false);
})()
