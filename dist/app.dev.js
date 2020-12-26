"use strict";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); // init slider values

var brightnessValue = 0;
var contrastValue = 0;
var vibranceValue = 0;
var saturationValue = 0;
var blurValue = 0;
var sepiaValue = 0;
var sharpenValue = 0;
var img = new Image();
var fileName = '';
var firstImg; // Upload File

var uploadFile = document.getElementById('upload-file');
uploadFile.addEventListener('change', function (e) {
  // Get file
  var file = document.getElementById('upload-file').files[0]; // init file reader

  var reader = new FileReader();

  if (file) {
    fileName = file.name; // read file as url

    reader.readAsDataURL(file);
  } // add image to canvas


  reader.addEventListener('load', function () {
    // create object image
    img = new Image(); // give it src

    img.src = reader.result; // dimensions

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.removeAttribute('data-caman-id');
    };

    firstImg = img;
  }, false);
}); // Sliders funct

function brightnessSlider() {
  // slider Val
  brightnessValue = document.getElementById('brightness_value').value; // output next to slider

  document.getElementById('brightnessVal').innerHTML = brightnessValue; // filter itself 

  Caman('#canvas', img, function () {
    this.brightness(brightnessValue).render();
    brightnessValue = 0;
  });
}

function vibranceSlider() {
  vibranceValue = document.getElementById('vibrance_value').value;
  document.getElementById('vibranceVal').innerHTML = vibranceValue;
  Caman('#canvas', img, function () {
    this.vibrance(vibranceValue).render();
  });
}

function contrastSlider() {
  contrastValue = document.getElementById('contrast_value').value;
  document.getElementById('contrastVal').innerHTML = contrastValue;

  if (contrastValue > 0) {
    Caman('#canvas', img, function () {
      this.contrast(10).render();
    });
  } else {
    Caman('#canvas', img, function () {
      this.contrast(-10).render();
    });
  }
}

function saturationSlider() {
  saturationValue = document.getElementById('saturation_value').value;
  document.getElementById('saturationVal').innerHTML = saturationValue;
  Caman('#canvas', img, function () {
    this.saturation(saturationValue).render();
  });
}

function noiseSlider() {
  noiseValue = document.getElementById('noise_value').value;
  document.getElementById('noiseVal').innerHTML = noiseValue;
  Caman('#canvas', img, function () {
    this.noise(noiseValue).render();
  });
}

function blurSlider() {
  blurValue = document.getElementById('blur_value').value;
  document.getElementById('blurVal').innerHTML = blurValue;
  Caman('#canvas', img, function () {
    this.stackBlur(blurValue).render();
  });
}

function sepiaSlider() {
  sepiaValue = document.getElementById('sepia_value').value;
  document.getElementById('sepiaVal').innerHTML = sepiaValue;
  Caman('#canvas', img, function () {
    this.sepia(sepiaValue).render();
  });
}

function sharpenSlider() {
  sharpenValue = document.getElementById('sharpen_value').value;
  document.getElementById('sharpenVal').innerHTML = sharpenValue;
  Caman('#canvas', img, function () {
    this.sharpen(sharpenValue).render();
  });
} // Presets funct


function vintage() {
  Caman('#canvas', img, function () {
    this.vintage().render();
  });
}

function lomo() {
  Caman('#canvas', img, function () {
    this.lomo().render();
  });
}

function clarity() {
  Caman('#canvas', img, function () {
    this.clarity().render();
  });
}

function sinCity() {
  Caman('#canvas', img, function () {
    this.sinCity().render();
  });
}

function crossProcess() {
  Caman('#canvas', img, function () {
    this.crossProcess().render();
  });
}

function jarques() {
  Caman('#canvas', img, function () {
    this.jarques().render();
  });
}

function oldBoot() {
  Caman('#canvas', img, function () {
    this.oldBoot().render();
  });
}

function concentrate() {
  Caman('#canvas', img, function () {
    this.concentrate().render();
  });
} // remove filters btn


function remove() {
  // remove fun
  Caman('#canvas', img, function () {
    this.revert();
  }); // assign sliders

  brightnessValue = 0;
  contrastValue = 0;
  vibranceValue = 0;
  saturationValue = 0;
  noiseValue = 0;
  blurValue = 0;
  sepiaValue = 0;
  sharpenValue = 0; // assign position of slider

  document.getElementById('brightness_value').value = brightnessValue;
  document.getElementById('contrast_value').value = contrastValue;
  document.getElementById('vibrance_value').value = vibranceValue;
  document.getElementById('saturation_value').value = saturationValue;
  document.getElementById('noise_value').value = noiseValue;
  document.getElementById('blur_value').value = blurValue;
  document.getElementById('sepia_value').value = sepiaValue;
  document.getElementById('sharpen_value').value = sharpenValue; // assign position of output

  document.getElementById('brightnessVal').innerHTML = brightnessValue;
  document.getElementById('contrastVal').innerHTML = contrastValue;
  document.getElementById('vibranceVal').innerHTML = vibranceValue;
  document.getElementById('saturationVal').innerHTML = saturationValue;
  document.getElementById('noiseVal').innerHTML = noiseValue;
  document.getElementById('blurVal').innerHTML = blurValue;
  document.getElementById('sepiaVal').innerHTML = sepiaValue;
  document.getElementById('sharpenVal').innerHTML = sharpenValue;
} // download btn logic


var downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', function (e) {
  // info about file and extention
  var fileExtension = fileName.slice(-4);
  var newFileName;

  if (fileExtension === '.jpg' || fileExtension === '.png') {
    newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
  }

  download(canvas, newFileName);
});

function download(canvas, fileName) {
  // func to download
  var e;
  var link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/jpeg', 0.8);
  e = new MouseEvent('click');
  link.dispatchEvent(e);
}