const jimp = require('jimp');

const resize = async (file) => {
  const image = await jimp.read(file);
  await image.resize(250, 250);
  await image.writeAsync(file);
};

module.exports = resize;
