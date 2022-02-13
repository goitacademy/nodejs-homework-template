const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatarUser = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const [extention] = filename.split(".").reverse();
  const newFile = `${_id}.${extention}`;
  const resultUpload = path.join(avatarsDir, newFile);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", newFile);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    statuss: "success",
    code: 200,
    avatarURL,
  });
};

module.exports = avatarUser;
