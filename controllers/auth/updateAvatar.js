const { User } = require("../../models/users");

const { ctrlWrapper } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch((error) => {
        throw error;
      });

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
