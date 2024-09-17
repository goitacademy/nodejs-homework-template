const fs = require("fs/promises");
const path = require("path");

const jimp = require("jimp");

const avatarsDir = path.resolve("public", "avatars");
const tmpDir = path.resolve("tmp");

const saveUserAvatar = async (req, res) => {
  if (req) {
    const { path: oldPath, filename: originalFilename } = req.file;
    const uniquePrefix = Date.now();
    const filename = `${uniquePrefix}-${originalFilename}`;
    const imagePath = path.join(avatarsDir, filename);
    const tmpImagePath = path.join(tmpDir, filename);

    await fs.rename(oldPath, tmpImagePath);

    const image = await jimp.read(tmpImagePath);
    await image.resize(250, 250).writeAsync(imagePath);

    await fs.unlink(tmpImagePath);

    return `/avatars/${filename}`;
  }

  return null;
};

module.exports = {
  saveUserAvatar,
};
