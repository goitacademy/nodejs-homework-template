const Jimp = require("jimp");

const resize = async (req, res, next) => {
  try {
    const { path } = req.file;
    const avatar = await Jimp.read(path);
    avatar.resize(250, 250);
    avatar.write(path);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resize;
