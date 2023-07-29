const Jimp = require("jimp");

const resizeFile = (fullPathToFile) => {
  Jimp.read(fullPathToFile).then((image) => {
    return image.resize(250, 250); // resize
  });
};

module.exports = resizeFile;
