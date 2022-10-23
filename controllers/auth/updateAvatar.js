const fs = require("fs").promises;
const { User } = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, filename);
   await fs.rename(tempUpload, resultUpload);
  Jimp.read(tempUpload)
    .then((_id) => {
      return _id.resize(250, 250).write(resultUpload);
    })
    .catch((err) => console.log(err));
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
