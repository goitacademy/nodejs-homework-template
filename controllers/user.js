const fs = require("node:fs/promises");
const path = require("node:path");
const jimp = require("jimp");

const User = require("../models/user");

async function getAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user.id).exec();
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.avatar === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }
    res.sendFile(path.join(__dirname, "..", "public/avatars", user.avatar));
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    ).exec();
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function processAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No avatar uploaded" });
    }

    const imageBuffer = req.file.buffer;

    const image = await jimp.read(imageBuffer);

    await image.resize(250, 250);

    const imageFormat = req.file.originalname.split(".").pop().toLowerCase();

    const supportedFormats = ["png", "jpeg", "jpg"];
    if (!supportedFormats.includes(imageFormat)) {
      return res.status(400).json({ message: "Unsupported image format" });
    }

    const uniqueFilename = `${req.user.id}-${Date.now()}.${imageFormat}`;
    const tmpPath = path.join(__dirname, "tmp", uniqueFilename);
    await image.writeAsync(tmpPath);

    const avatarPath = path.join(
      __dirname,
      "..",
      "public/avatars",
      uniqueFilename
    );
    await fs.rename(tmpPath, avatarPath);

    const avatarURL = `/avatars/${uniqueFilename}`;
    req.user.avatarURL = avatarURL;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadAvatar, getAvatar, processAvatar };
