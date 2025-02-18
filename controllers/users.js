const fs = require("fs").promises;
const path = require("path");
const User = require("../models/user");
const jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id: userId } = req.user;

    const filename = `${userId}-${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    await fs.unlink(tempUpload);

    const avatarURL = `/avatars/${filename}`;

    const user = await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });

    res.status(200).json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateAvatar };
