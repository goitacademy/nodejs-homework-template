const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");
const { resizeImg } = require("../../utils/resizeImg");

// const { HttpError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: temporaryUpload, filename } = req.file;
    console.log("temporaryUpload--->", temporaryUpload);
    const isResizeImg = await resizeImg(temporaryUpload);
    if (!isResizeImg) {
      throw new Error("Failed to resize image");
    }
    console.log("isResizeImg--->", isResizeImg);
    const avatarName = `${_id}_${filename}`;

    const resultUpload = path.join(avatarsDir, avatarName);

    await fs.rename(temporaryUpload, resultUpload);
    const avatarURL = path.join("avatars", avatarName);
    console.log("avatarURL--->", avatarURL);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
module.exports = updateAvatar;
