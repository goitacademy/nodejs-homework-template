const Jimp = require("jimp");

const resizeFile = async (fullPathToFile) => {
  const image = await Jimp.read(fullPathToFile);
  image.resize(250, 250); // resize
  await image.writeAsync(fullPathToFile); // rewrite file
};

module.exports = resizeFile;
