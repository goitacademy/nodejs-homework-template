const Jimp = require("jimp");

const isImageAndTransform = async (inputPath, outputPath) => {
  try {
    const image = await Jimp.read(inputPath);
    image.resize(250, 250);
    await image.writeAsync(outputPath);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { isImageAndTransform };
