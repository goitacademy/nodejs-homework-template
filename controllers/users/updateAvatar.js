const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  try {
    const { _id: id } = req.user;
    const imgName = `${id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, imgName);

    const img = await Jimp.read(tempUpload);
    img.resize(250, 250);
    img.writeAsync(resultUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imgName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
