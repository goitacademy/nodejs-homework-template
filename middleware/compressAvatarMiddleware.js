const fs = require("fs").promises;
const Jimp = require("jimp");
const { join } = require("path");

const path = require("path");
const avatarsPath = path.resolve("./public/avatars");

const compressAvatarMiddleware = async (req, res, next) => {
  if (!req?.file?.path) {
    return res.status(401).json({ message: `NO` });
  }
  const tmpPath = req.file.path;
  const newPath = join(avatarsPath, req.file.filename);
  const file = await Jimp.read(tmpPath);

  await file.resize(250, 250).writeAsync(newPath);

  req.file.destination = avatarsPath;
  req.file.path = newPath;
  await fs.unlink(tmpPath);

  next();
};
module.exports = {
  compressAvatarMiddleware,
};
