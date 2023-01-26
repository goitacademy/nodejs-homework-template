const fs = require("fs/promises");
const Jimp = require("jimp");
const path = require("path");
const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const fileName = `${_id}_${originalname}`;

  const img = await Jimp.read(`${tempUpload}`);
  await img.resize(250, 250).writeAsync(tempUpload);

  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("public", "avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    status: "Ok",
    code: 200,
    avatarURL,
  });
};
module.exports = updateAvatar;