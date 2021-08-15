const Jimp = require('jimp');

const imageNormalize = imagePath => {
  Jimp.read(`${imagePath}`, (err, convertedImage) => {
    if (err) {
      throw err;
    }
    convertedImage
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
      .write(`${imagePath}`);
  });
};

module.exports = imageNormalize;