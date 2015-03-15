/**
 * p5.js-pdf
 * Copyright (c) 2015 Zeno Zeng<zenoofzeng@gmail.com>.
 * Licensed under the MIT License.
 *
 * Simple jsPDF API warpper for p5.js
 */

(function(p5) {

    "use strict";

    var jsPDF = require('./jspdf/index');

    var PDF = function(options) {
        if(!options) {
            options = {};
        }

        this.pdf = new jsPDF();
        this.canvas = options.canvas || document.getElementById('defaultCanvas');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.ppi = options.ppi || 72;

        this.imageType = options.imageType || 'JPEG';

        // current y offset at this page
        this.yOffset = 0;
    };

    // manually capture current canvas
    PDF.prototype.capture = function() {
        var img = this.canvas.toDataURL('image/' + this.imageType, 0.95);

        var width = this.width,
            height = this.height;

        // apply options.ppi
        var pixelsPerMM = this.ppi * 0.03937;
        width /= pixelsPerMM;
        height /= pixelsPerMM;

        // scale if necessary
        var A4 = {
            width: 210,
            height: 297
        };
        if(width > A4.width) {
            width = A4.width;
            height = this.height / this.width * width;
        }

        // current page doesn't have enough room
        if(this.yOffset + height > A4.height) {
            this.nextPage();
        }

        this.pdf.addImage(img, this.imageType, 0, this.yOffset, width, height);
        this.yOffset += height;
    };

    // go to nextpage
    PDF.prototype.nextPage = function() {
        this.yOffset = 0;
        this.pdf.addPage();
    };

    // must be called onclick otherwise will be prevented by browser
    PDF.prototype.save = function(filename) {
        filename = filename || "untitled.pdf";
        var a = document.createElement('a');
        a.download = filename;
        a.href = this.toObjectURL();
        document.body.appendChild(a);
        setTimeout(function() {
            a.click();
            a.remove();
        }, 0);
    };

    // Convert to Object URL using URL.createObjectURL
    // 适合用于在页面内直接显示 PDF
    PDF.prototype.toObjectURL = function() {
        return this.pdf.output('bloburi');
    };

    // convert to data url
    PDF.prototype.toDataURL = function() {
        return this.pdf.output('datauristring');
    };

    p5.PDF = PDF;

})(window.p5);
