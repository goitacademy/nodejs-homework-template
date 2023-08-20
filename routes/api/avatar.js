const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const contactsFunc = require("../../models/contacts");
const { updateAvatar } = require("../../models/contacts");

router.get("/avatars/avatar.jpg", async (req, res, next) => {
  const avatarPath = path.join(__dirname, "../../public/avatars/avatar.jpg");
  res.sendFile(avatarPath);
});

router.patch(
  "/users/avatars",
  contactsFunc.auth,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;

      if (!req.file) {
        return res.status(400).json({ message: "No file!" });
      }

      const updatedUser = await contactsFunc.updateAvatar(user, req.file);

      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update avatar" });
      }

      return res.status(200).json({
        message: "avatar updated successfully!",
        avatarURL: updatedUser.avatar,
      });
    } catch (err) {
      return res.status(500).json({ message: "Error updating avatars" });
    }
  }
);

module.exports = router;
