const Jimp = require('jimp');
const fs = require('fs/promises');
const HttpError = require('./HttpError');

async function resizeImage(
  tempFilePath,
  resultFilePath,
  width = 250,
  height = 250
) {
  try {
    const image = await Jimp.read(tempFilePath);
    await image.cover(width, height).writeAsync(resultFilePath);
    await fs.unlink(tempFilePath);
  } catch (err) {
    throw new HttpError(404, err.message);
  }
}

module.exports = resizeImage;
