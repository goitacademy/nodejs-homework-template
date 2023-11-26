const Jimp = require("jimp");

const resizeImage = async (path, width, height) => {
  const image = await Jimp.read(path);

  await image
    .autocrop()
    .cover(
      width,
      height,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )
    .writeAsync(path);
};

module.exports = resizeImage;
