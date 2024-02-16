const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUrl = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalName } = req.file;
  const extension = originalName.split(".").pop();
  const fileName = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  Jimp.read(resultUpload)
    .then((avatar) => {
      return avatar.resize(256, 256).write(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });
  const avatarUrl = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = updateUrl;
