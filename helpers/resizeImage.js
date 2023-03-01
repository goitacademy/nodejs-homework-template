const Jimp = require('jimp');

const resizeImage = async (imagePath, w = 250, h = 250) => {
  const image = await Jimp.read(imagePath);
  return await image.resize(w, h).write(imagePath);
};
module.exports = resizeImage;
