const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const fileName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", fileName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatars;
