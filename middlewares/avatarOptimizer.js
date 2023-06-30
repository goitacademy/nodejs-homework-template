const Jimp = require('jimp');

const avatarOptimizer = async (req, res, next) => {
  const filePath = req.file.path;

  console.log(filePath);
  await Jimp.read(filePath).then(img => {
    return img.resize(250, 250).quality(75).write(filePath);
  });

  next();
};

module.exports = avatarOptimizer;
