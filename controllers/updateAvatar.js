const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const updateAvatar = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded updateAvatar" });
    }

    const image = await jimp.read(req.file.path);
    await image.resize(250, 250).write(req.file.path);

    const uniqueFileName = `${Date.now()}-${req.user.id.toString()}${path.extname(
      req.file.originalname
    )}`;

    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public", "avatars", uniqueFileName)
    );

    req.user.avatarURL = `/avatars/${uniqueFileName}`;
    await req.user.save();

    res.json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error updateAvatar" });
  }
};

module.exports = updateAvatar;
