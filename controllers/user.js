const fs = require("fs/promises");
const path = require("path");

const { User } = require("../models/user.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const jimp = require('jimp');


const updateAvatar = async (req, res) => {
  const { id } = req.user;
  try {
    const ext = path.extname(req.file.originalname);
    const oldPath = req.file.path;
    // check if user folder exists
    const userDirectory = path.resolve("public", id)
    await fs.mkdir(userDirectory, { recursive: true });
    // transfer img to user folder
    const newPath = path.resolve("public", id, `avatar.png`);
    await fs.rename(oldPath, newPath);
    // jimp 
    if (ext !== ".webp") {
      await jimp.read(newPath).then(img => {
        img.resize(256, 256)
        img.quality(60)
        img.write(newPath)
      })
    };
    // send url to db
    const avatarUrl = `/${id}/avatar.png`;
    await User.findByIdAndUpdate(id, { avatarUrl }, { new: true });

    // response
    res.json({
      avatarUrl: avatarUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.massage })
  }
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};