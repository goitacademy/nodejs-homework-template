const fs = require("fs").promises;
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const User = require("../models/user");
const { isImageAndTransform } = require("../helpers");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { path: temporaryPath } = req.file;
  const extension = path.extname(temporaryPath);
  const fileName = `${uuidV4()}${extension}`;
  const filePath = path.join(process.cwd(), "public/avatars", fileName);

  try {
    const isValidAndTransform = await isImageAndTransform(
      temporaryPath,
      filePath
    );
    if (!isValidAndTransform) {
      await fs.unlink(temporaryPath);
      return res.status(400).json({ message: "File isn't a photo" });
    }

    const user = await User.findByIdAndUpdate(
      res.locals.user.id,
      { avatarURL: `/avatars/${fileName}` },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateAvatar };
