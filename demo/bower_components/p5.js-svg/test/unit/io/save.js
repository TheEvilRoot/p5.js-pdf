define(function(require) {
    var p5 = require('p5');
    require('p5.svg');
    var assert = require('chai').assert;
    var testDownload = require('./test-download.js');

    describe('IO/save', function() {
        it('save()', function(done) {
            testDownload('untitled', 'svg', function(p) {
                p.save();
            }, done);
        });

        it('save(Graphics)', function(done) {
            testDownload('untitled', 'svg', function(p) {
                p.save(p._defaultGraphics);
            }, done);
        });

        it('save(<svg>)', function(done) {
            testDownload('untitled', 'svg', function(p) {
                p.save(p.svg);
            }, done);
        });

        it('canvas\'s save should still work', function(done) {
            testDownload('canvas-save.png', 'png', function(p) {
                p.save('canvas-save.png');
            }, done, true);
        });
    });
});
