const path = require("path");
const fs = require("fs");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload, () => {
    console.log("\nFile Renamed!\n");
  });

  const avatarURL = path.join("public", "avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
