const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const storeImage = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const fileName = path.join(storeImage, originalname);
    await fs.rename(temporaryName, fileName);
    const avatarUrl = path.join("public", "avatars", imageName);

    Jimp.read(avatarUrl).then((avatar) => {
      return avatar.resize(250, 250).write(avatarUrl);
    });

    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
};

module.exports = updateAvatar;
