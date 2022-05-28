const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const avatars = async (req, res, next) => {
  const { _id: id } = req.user;
  const { originalname, path: tempUpload } = req.file;
  const [extention] = originalname.split(".").reverse();
  const fileName = `${id}.${extention}`;
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = avatars;
