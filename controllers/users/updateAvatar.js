const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const uniqueAvatarName = `${_id}_${originalname}`;

  try {
    const reworkedAvatar = await Jimp.read(tempUpload);
    await reworkedAvatar
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, uniqueAvatarName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", uniqueAvatarName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    res.json({
      status: "OK",
      code: 200,
      message: "Avatar was updated",
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);

    res.status(417).json({
      status: "Expectation Failed",
      code: 417,
    });
  }
};

module.exports = updateAvatar;