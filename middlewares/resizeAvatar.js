const Jimp = require("jimp");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const resizeAvatar = async (req, res, next) => {
  const avatar = await Jimp.read(req.file.path);
  avatar.resize(250, 250).write(`${tempDir}/${req.file.originalname}`);
  next();
};

module.exports = resizeAvatar;
