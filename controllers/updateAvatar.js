const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(
      __dirname,
      "../",
      "public",
      "avatars",
      imageName
    );
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);

    await Jimp.read(avatarURL, async (err, img) => {
      if (err) throw err;
      await img.resize(250, 250);
      await img.writeAsync(avatarURL);
    });

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({
      status: "Ok",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
