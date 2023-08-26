const Jimp = require("jimp");

const avatarResize = async (imagePath) => {
  const image = await Jimp.read(imagePath);
  await image.resize(250, 250);
  await image.writeAsync(imagePath);
};

module.exports = avatarResize;
