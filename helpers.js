const Jimp = require("jimp");

const isImageAndTransform = async (inputPath, outputPath) => {
  try {
    const image = await Jimp.read(inputPath);
    image.resize(256, 256);
    await image.writeAsync(outputPath);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { isImageAndTransform };
