const Jimp = require("jimp");
const { HttpError } = require("../utils");

const resize = async (req, res, next) => {
  const { path } = req.file;
  const image = await Jimp.read(path);
  try {
    await image.resize(250, 250);
    await image.writeAsync(path);
    next();
  } catch (error) {
    next(HttpError(404));
  }
};
module.exports = resize;
