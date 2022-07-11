const { User } = require("../../models");
const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id: id } = req.user;
  const [extention] = originalname.split(".").reverse();
  const imageName = `${id}.${extention}`;
  const resultUpload = path.join(avatarsDir, imageName);
  try {
    await fs.rename(tempDir, resultUpload);
    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempDir);
  }
};

module.exports = updateAvatar;
