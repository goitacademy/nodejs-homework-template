const Jimp = require("jimp");

const sizeChangerImage = async (req, res, next) => {
  const { path: tempDir } = req.file;

  Jimp.read(tempDir)
    .then((image) => {
      return image.resize(250, 250).write(tempDir);
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = sizeChangerImage;
