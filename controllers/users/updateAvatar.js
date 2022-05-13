const { User } = require("../../models/user");

const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const { originalname, path: tempUpload } = req.file;
    const [extension] = originalname.split(".").reverse();
    const fileName = `${id}.${extension}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = uploadAvatar;
