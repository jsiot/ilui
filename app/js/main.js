(function(){
	'use strict';

    const path = require('path');
    const fs = require('fs');
    const sizeOf = require('image-size');
    const filesize = require('filesize');
    const clipboard = require('clipboard');

    const core = require('./lib/convert.js');
  	const dialog = require('remote').require('./lib/util.js');
    
  	const content = document.getElementById('main');
  	const img = document.getElementById('imagetoconvert');    

	angular.module('img2lcd', []).controller('AppController', ['$scope', ($scope) => {
    	$scope.autoconvert = false;
        $scope.tmpFile = null;

        img.src = 'no.image.png';
        
        document.addEventListener('dragover', (e) => {
          e.preventDefault();
          return false;
        }, false);
    
        document.addEventListener('dragleave', () => false, false);
        document.addEventListener('dragend', () => false, false)    
        document.addEventListener('drop' , (e) => {
          e.preventDefault();
          let file = e.dataTransfer.files[0];
          img.src = file.path;
          $scope.imgFile = file.path;
          setProperties($scope.imgFile);
          if($scope.autoconvert){
            $scope.convert();
          }
          return false;

        }, false);

        document.getElementById('hex').addEventListener('click', function(){
          this.select();
        })

        function setProperties(imageFile) {
          let d = sizeOf(imageFile);
          let stats = fs.statSync(imageFile);
          document.getElementById('hex').value = '';
          document.getElementById('status').innerHTML = '';
          document.getElementById('imgname').innerHTML = path.basename($scope.imgFile);
          document.getElementById('imgdim').innerHTML = d.width+'x'+d.height; 
          document.getElementById('imgsize').innerHTML = filesize(stats['size'], {round: 0});
        }

    	$scope.convert = () => {
            if($scope.imgFile != null) {
              core.convert($scope.imgFile).then( (data) => {
                $scope.tmpFile = data.path;
                document.getElementById('hex').value = data.content;
                document.getElementById('status').innerHTML = data.path;
              }, (err) => console.log(err))   
            }
        }

    	$scope.save = () => {
    		if($scope.tmpFile){
    			dialog.saveFile($scope.tmpFile,  (f) => document.getElementById('status').innerHTML = `Save to ${f}`);
    		}
    	}

    	$scope.open = () => {
    		dialog.openFile((s) => {
              img.src = s[0];
              $scope.imgFile = s[0];
              setProperties($scope.imgFile);
              if($scope.autoconvert) {
                $scope.convert();
              }
    		})
    	}

    	$scope.copyToClipboard = () => {
            clipboard.writeText(document.getElementById('hex').value);
            document.getElementById('status').innerHTML = 'Hex copied to clipboard!';
        }

        $scope.checked = function() {
            if(document.getElementById('autocb').checked) {
              $scope.autoconvert = true;
            } else {
              $scope.autoconvert = false;
            }
        }
    }]);
})()