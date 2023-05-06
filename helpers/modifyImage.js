const Jimp = require("jimp");

const modifyImage = async (imagePath) => {
  const image = await Jimp.read(imagePath);
  await image
    .autocrop()
    .cover(250, 250)
    .quality(60)
    .greyscale()
    .writeAsync(imagePath);
};

module.exports = modifyImage;
