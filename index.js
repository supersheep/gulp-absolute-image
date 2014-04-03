var es = require('event-stream');
var absolutePathParser = require("css-absolute-image-path");
var clone = require('clone');


// Plugin function
function absoluteImageGulp(opt){
  var parser = new absolutePathParser(opt);

  function modifyContents(file, cb){
    if(file.isNull()) return cb(null, file);

    var buf = new Buffer(parser.parse(file.path,file.contents.toString()));
    file.contents = buf;
    return cb(null, file);
  }

  return es.map(modifyContents);
}

module.exports = absoluteImageGulp;