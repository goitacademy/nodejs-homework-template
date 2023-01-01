const Jimp = require('jimp');

const convertingAvatars = async ({ tmpDir }) => {
  const image = await Jimp.read(tmpDir);

  await image.cover(250, 250).writeAsync(tmpDir);
};

module.exports = convertingAvatars;
