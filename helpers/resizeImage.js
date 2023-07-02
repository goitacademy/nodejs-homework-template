const Jimp = require("jimp");

const resizeImage = async (sourcePath, destinationPath) => {
  const image = await Jimp.read(sourcePath);
  image.resize(250, 250);
  await image.writeAsync(destinationPath);
};

module.exports = resizeImage;
