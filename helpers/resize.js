const jimp = require('jimp');

const resize = async (file, size) => {
  const image = await jimp.read(file);
  await image.resize(size, jimp.AUTO);
  await image.writeAsync(file);
};

module.exports = resize;
