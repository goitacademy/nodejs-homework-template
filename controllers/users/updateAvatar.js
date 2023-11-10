const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  console.log("REQ.FILE", req.file);
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log(tempUpload);
  const imageName = `${_id}_${originalname}`;
  try {
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(tempUpload);
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    console.log(avatarURL);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink();
    throw error;
  }
};

module.exports = updateAvatar;
