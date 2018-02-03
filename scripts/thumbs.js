'use strict';

const sharp = require('sharp');
const fs = require('fs');

const imagesDir = __dirname + '/../public/images';
const thumbsDir = __dirname + '/../public/thumbs';

const toGenerate = [];

fs.readdirSync(imagesDir).forEach((img) => { // get a list of all images
  // for each image, check to see if it has a thumbnail,
  // and compare the modified time of this image to the thumb's (if it exists)
  let shouldGenerate = false;
  try {
    const imageStats = fs.statSync(`${imagesDir}/${img}`);
    const thumbStats = fs.statSync(`${thumbsDir}/${img}`);
    if (imageStats.mtimeMs > thumbStats.mtimeMs) {
      shouldGenerate = true;
    }
  } catch(e) {
    shouldGenerate = true;
  }
  if (shouldGenerate) {
    toGenerate.push(img);
  }
});
// now, generate each thumb
return Promise.all(toGenerate.map((img) => {
  return sharp(`${imagesDir}/${img}`).resize(720).toFile(`${thumbsDir}/${img}`)
})).catch((err) => {
  return console.log('ERROR!', err);
});
