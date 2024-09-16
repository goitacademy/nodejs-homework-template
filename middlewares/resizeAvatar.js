const Jimp = require("jimp");

const resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const image = await Jimp.read(req.file.path);
    await image.resize(250, 250, Jimp.RESIZE_BEZIER);
    await image.writeAsync(req.file.path);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeAvatar;
