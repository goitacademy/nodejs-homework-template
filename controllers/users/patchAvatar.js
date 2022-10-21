const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { RequestError } = require("../../helpers");

const patchAvatar = async (req, res, next) => {
  const publicDir = path.join(__dirname, "../..", "public");
  const oldPath = req.file.path;
  const newFileName = `${req.user._id}.${req.file.filename}`;
  const newPath = path.join(publicDir, "avatars", newFileName);

  try {
    const img = await Jimp.read(oldPath);
    img.resize(250, 250);

    await fs.rename(oldPath, newPath);

    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatarURL: path.join("avatars", newFileName),
      },
      { new: true }
    );

    res.status(200).json({
      avatarURL: result.avatarURL,
    });
  } catch (error) {
    await fs.unlink(oldPath);
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = patchAvatar;
