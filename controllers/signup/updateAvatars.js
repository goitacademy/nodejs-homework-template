const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { path: tempUpload, originalName } = req.file;

  try {
    const resultUpload = path.join(avatarsDir, originalName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", originalName);
    await User.findByIdAndUpdate(req.user._id, avatarUrl);

    req.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatars;
