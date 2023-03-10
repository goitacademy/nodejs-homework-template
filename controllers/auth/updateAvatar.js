const path = require("path");
const fs = require("fs");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  Jimp.read(originalname, (err, name) => {
    if (err) throw err;
    console.log(name);
    name
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality// set greyscale
      .write(originalname); // save
  });

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
