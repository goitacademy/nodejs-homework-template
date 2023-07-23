const Jimp = require('jimp');

async function resizeImage(pathToImage) {
  const avatar = await Jimp.read(pathToImage);
  await avatar.resize(250, 250).write(pathToImage);
}

module.exports = resizeImage;
