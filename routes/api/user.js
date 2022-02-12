const express = require("express");
const router = express.Router();

const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { authenticate, upload } = require("../../middlewares");

const { User } = require("../../models/user");

const { signup, login } = require("../../controllers/auth");

router.post("/signup", signup);

router.post("/login", login);

router.get("/current", authenticate, async (req, res, next) => {
  const { subscription } = req.user;
  res.json({
    email: req.user.email,
    subscription,
  });
});

router.get("/logout", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
});

router.patch("/current", authenticate, async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({
    email: req.user.email,
    subscription,
  });
});

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res, next) => {
    const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    try {
      const [extention] = filename.split(".").reverse();
      const newFileName = `${_id}.${extention}`;
      const resultUpload = path.join(avatarsDir, newFileName);

      Jimp.read(tempUpload, async (err, img) => {
        const imgRes = await img.resize(250, 250);
        await imgRes.write(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        if (err) throw err;
      });

      const avatarURL = path.join("avatars", newFileName);
      await User.findByIdAndUpdate(_id, { avatarURL });
      res.json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
