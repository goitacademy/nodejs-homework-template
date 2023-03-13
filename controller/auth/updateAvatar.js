const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const ext = originalname.split(".").pop();
  const filename = _id + "." + ext;
  const resultUpload = path.join(avatarsDir, filename);

  const image = await Jimp.read(tempDir);
  await image.resize(250, 250).write(tempDir);

  await fs.rename(tempDir, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
