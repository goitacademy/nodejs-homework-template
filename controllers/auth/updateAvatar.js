const { User } = require("../../models");

const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const fs = require("fs/promises");

const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const uploadResult = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, uploadResult);

    const image = await Jimp.read(uploadResult);
    image.resize(Jimp.AUTO, 150).quality(60).write(uploadResult);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
