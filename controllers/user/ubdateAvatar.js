const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");
const ubdateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const fileName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);
  console.log(resultUpload);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  console.log(avatarURL);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = ubdateAvatar;
