const Jimp = require('jimp');

const avatarResize = async (path) => {
  // Read the image.
  const image = await Jimp.read(path);

  // Resize the image to width 250 and height 250.
  await image.resize(250, 250);

  // Save and overwrite the image
  await image.writeAsync(path);
};

module.exports = avatarResize;
