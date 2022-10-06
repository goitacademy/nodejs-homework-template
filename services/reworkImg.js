const Jimp = require("jimp");
const fs = require("fs/promises");

const reworkImg = async (imgPath, resultImgPath) => {
  try {
    const readImg = await Jimp.read(imgPath);
    await readImg.resize(250, 250).writeAsync(imgPath);
    await fs.rename(imgPath, resultImgPath);
  } catch (error) {
    fs.unlink(imgPath);
    throw error;
  }
};

module.exports = reworkImg;
