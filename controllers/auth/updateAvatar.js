const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  const filenameJimp = Jimp.read(`${filename}`, (err, filename) => {
    if (err) throw err;
    filename
      .resize(250, 250) // resize
      .write(`${filename}`); // save
  });
  const resultUpload = path.join(avatarDir, filenameJimp);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filenameJimp);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
