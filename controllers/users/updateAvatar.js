const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const Jimp = require("jimp")


async function resize(avatar) {
    const image = await Jimp.read(avatar);
    image.resize(250,250)
    .write('small.png');
  }


const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {

  const { path: tempUploadDir, originalname } = req.file;
  const {_id: id} = req.user

  const avatarName = `${id}_${originalname}`
  try {
    const avatar = await Jimp.read(tempUploadDir);
    await avatar.resize(250, 250);
    await avatar.write(tempUploadDir);
    const resultUploadDir = path.join(avatarsDir, avatarName);
    await fs.rename(tempUploadDir, resultUploadDir);
    const avatarUrl = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUploadDir);
  }
};

module.exports = updateAvatar;
