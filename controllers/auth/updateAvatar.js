const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;
  // resizing avatar
  const image = await jimp.read(tempDir);
  image.resize(250, 250).writeAsync(tempDir);

  const [extention] = originalname.split(".").reverse();
  const newName = `${_id}.${extention}`;
  const resultDir = path.join(avatarsDir, newName);
  await fs.rename(tempDir, resultDir);
  const avatarURL = path.join("avatars", newName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
