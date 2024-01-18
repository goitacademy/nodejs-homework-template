const jimp = require("jimp");

const resizeAvatar = async (req, res, next) => {
  const { path } = req.file;

  const image = await jimp.read(path);
  await image.resize(250, 250);
  await image.writeAsync(path);
  next();
};

module.exports = resizeAvatar;