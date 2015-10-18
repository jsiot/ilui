(function(){
	'use strict';

    var path = require('path');
    var fs = require('fs');
    var sizeOf = require('image-size');
    var filesize = require('filesize');

    var core = require('./lib/convert.js');
  	var dialog = require('remote').require('./lib/util.js');
    
  	var content = document.getElementById('main');
  	var img = document.getElementById('imagetoconvert');
    var imgFile = null;

  	img.src = 'no.image.png';
  	    
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
	    img.src = file.path;
	    imgFile = file.path;
	    return false;
	}, false);

	angular.module('img2lcd', []).controller('AppController', ['$scope',function($scope){
    	$scope.status = '';
        $scope.tmpFile;
       
    	$scope.convert = function(){
    		if(imgFile != null) {
			  core.convert(imgFile, function(err, data){
				if(err){ 
				  console.log(err);
				} else {
				  $scope.tmpFile = data.path;
				  console.log(data.path);  
				  document.getElementById('hex').value = data.content;
				  document.getElementById('status').innerHTML = data.path;
				}
			  });	   
		    }
    	}

    	$scope.save = function(){
    		if($scope.tmpFile){
    			dialog.saveFile($scope.tmpFile, function(f){
                  $scope.status = f;
    			});
    		}
    	}

    	$scope.open = function(){
    		dialog.openFile(function(s){
              img.src = s[0];
              imgFile = s[0];
              var d = sizeOf(imgFile);
              var stats = fs.statSync(imgFile);
              document.getElementById('hex').value = '';
			  document.getElementById('status').innerHTML = '';
              document.getElementById('imgname').innerHTML = path.basename(imgFile);
              document.getElementById('imgdim').innerHTML = d.width+'x'+d.height; 
              document.getElementById('imgsize').innerHTML = filesize(stats['size'], {round: 0});
    		})
    	}
    }]);
})()