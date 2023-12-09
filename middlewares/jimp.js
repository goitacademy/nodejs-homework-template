const Jimp = require("jimp");
const { HttpError } = require("../utils");

const jimp = async (req, res, next) => {
  try {
    const { path } = req.file;
    const image = await Jimp.read(path);
    await image.resize(250, 250).quality(100).writeAsync(path);
    next();
  } catch (err) {
    next(HttpError(400, "Bad request"));
  }
};

module.exports = jimp;
