const Jimp = require('jimp');
const path = require('path');
const HttpError = require('../helpers/HttpErrors');

const avatarsPath = path.join(__dirname, '../', 'public');

const optimizationImg = file => {
  const filePath = path.join(avatarsPath, file);

  Jimp.read(filePath, (err, lenna) => {
    if (err) {
      throw HttpError(500, 'Server Error');
    }
    lenna.resize(256, 256).write(filePath);
  });
};

module.exports = optimizationImg;
