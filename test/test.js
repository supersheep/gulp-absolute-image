var assert = require('assert');
var es = require('event-stream');
var fs = require('fs');
var File = require('vinyl');
var processor = require('../');

require('should');

describe("should parse css absolute image path correctly", function(){
    it('should prepend text', function(done) {
        var fakeFile = new File({
            path: require('path').resolve('test/fixtures/css/a.css'),
            contents: new Buffer(fs.readFileSync('test/fixtures/css/a.css','utf-8') )
        });
        var p = processor({
            root_dir:"test/fixtures",
            root_path:"public",
            hosts:["i1.cdn.com","i2.cdn.com","i3.cdn.com"]
        });
        p.once("data",function(file){
            var actual = file.contents.toString();
            var expect = fs.readFileSync('test/expect/all.css','utf-8');
            actual.should.equal(expect);
            done();
        });
        p.write(fakeFile);
    });
});