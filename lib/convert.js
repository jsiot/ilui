var img2lcd = require('img2lcd');

exports.convert = function(path) {
  img2lcd.convert(path, function(err, hex){
    if(!err) {
      console.log(hex);
    }
  });   
}
