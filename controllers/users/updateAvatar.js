const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);

    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};

module.exports = updateAvatar;
