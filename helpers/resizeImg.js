const Jimp = require("jimp");

const resizeImg = async (filename) => {
  const image = await Jimp.read(`public/avatars/${filename}`);
  image.resize(250, 250);
  image.write(`public/avatars/${filename}`);
};
module.exports = resizeImg;
