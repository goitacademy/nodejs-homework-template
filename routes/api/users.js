const express = require("express");
const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const { User } = require("../../model");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.get("/current", authenticate, async (req, res) => {
  const { name, email } = req.user;
  res.json({
    user: {
      name,
      email,
    },
  });
});

router.get("/logout", authenticate, async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

router.patch("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { subscription } = req.body;
    const updateSubscription = await User.findOneAndUpdate(
      { id, owner: _id },
      { subscription },
      {
        new: true,
      }
    );
    res.json(updateSubscription);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const { path: tempUpload, filename } = req.file;
    const [extension] = filename.split(".").reverse();
    const newFileName = `${req.user._id}.${extension}`;
    const fileUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, fileUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
    res.json({ avatarURL });
    // для хранения файлов можно установить пакет cloudinary
  }
);

//   const image = await Jimp.read ('/home/jimp/img.jpg');
//   await image.resize(250,250)
//   await image.write('/home/jimp/resize.jpeg');

module.exports = router;
