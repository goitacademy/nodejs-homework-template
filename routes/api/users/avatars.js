const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const User = require("../../../models/User");
const authMiddleware = require("../../../authMiddleware");

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../../tmp"),
});

router.patch(
  "/",
  authMiddleware,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const { nanoid } = await import("nanoid");
      const tmpPath = req.file.path;
      const extension = path.extname(req.file.originalname);
      const uniqueName = `${nanoid()}${extension}`;
      const finalPath = path.join(
        __dirname,
        "../../../public/avatars",
        uniqueName
      );

      let image;
      try {
        image = await Jimp.read(tmpPath);
      } catch (error) {
        console.error("Error reading the file with Jimp:", error.message);
        return res.status(400).json({ message: "Invalid image file" });
      }

      await image.resize(250, 250).writeAsync(finalPath);
      await fs.unlink(tmpPath);

      const avatarURL = `api/users/avatars/${uniqueName}`;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { avatarURL },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
