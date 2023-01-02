const Jimp = require("jimp");

const resize = async (req, res, next) => {
  const { path } = req.file;
  const image = await Jimp.read(path);
  await image.resize(250, 250);
  await image.writeAsync(path);
  next();
};

module.exports = resize;
