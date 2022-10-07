const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");
const imageSize = require("../../helpers/imageSize");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const extension = originalname.split(".").pop();
  const fileName = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tmpUpload, resultUpload);
  await imageSize(resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
