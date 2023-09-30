const jimp = require("jimp");

const resizeImagesJimp = async (file, size) => {
  const image = await jimp.read(file);
  const width = image.getWidth();
  const height = image.getHeight();
  const cropSize = Math.min(width, height);
  const x = (width - cropSize) / 2;
  const y = (height - cropSize) / 2;
  image.crop(x, y, cropSize, cropSize).resize(size, size);
  await image.writeAsync(file);
};

module.exports = resizeImagesJimp;
