const express = require("express");
const router = express.Router();
const multer = require("multer");
const jimp = require("jimp");
const path = require("path");

const tmpFolder = path.join(__dirname, "/project-root/tmp");

const upload = multer({
  dest: tmpFolder,
  limits: {
    fileSize: 1000000,
  },
});

router.patch("/", upload.single("avatar"), async (req, res, next) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "File not provided" });
    }

    const avatar = await jimp.read(file.path);
    avatar.resize(250, 250).write(file.path);

    const newFileName = `${Date.now()}-${file.originalname}`;
    const avatarPath = path.join(
      __dirname,
      "../../public/avatars",
      newFileName
    );

    await fs.rename(file.path, avatarPath);

    req.user.avatarURL = `/avatars/${newFileName}`;
    await req.user.save();

    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
