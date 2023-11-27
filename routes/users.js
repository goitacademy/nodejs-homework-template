const express = require("express");

const UserController = require("../controllers/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/avatar", UserController.getAvatar);
router.patch("/avatar", upload.single("avatar"), UserController.uploadAvatar);
router.patch("/avatars", auth, UserController.processAvatar, (req, res) => {
  res.status(200).json({ avatarURL: req.user.avatarURL });
});

module.exports = router;
