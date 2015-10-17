(function(){
	'use strict';

  	var content = document.getElementById('main');
  	var img = document.getElementById('imageToConvert');

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

    var imgFile = null;

	document.addEventListener('drop' , function (e) {
	    e.preventDefault();
	    var file = e.dataTransfer.files[0];
	    img.src = file.path;
	    imgFile = file.path;
	    return false;
	}, false);

	var convertBtn = document.getElementById('convertBtn');
	convertBtn.addEventListener('click', function(){
		if(imgFile != null) {
			remote.convert(imgFile);	   
		}
	})
})()
