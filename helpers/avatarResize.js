const jimp = require("jimp");

const avatarResize = async (avatarPath) => {
  const image = await jimp.read(avatarPath);
  image.resize(250, 250);
  await image.writeAsync(avatarPath);
};

module.exports = avatarResize;
