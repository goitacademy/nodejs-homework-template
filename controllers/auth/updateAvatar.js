const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  // if (!req.file) {працює за умови що resizeAvatar буде в цьому ж файлі після перевірки  
  //   res.status(400).json("File upload error");
  // }
  
  const { path: tempUpload, originalname } = req.file;
  const filename = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;