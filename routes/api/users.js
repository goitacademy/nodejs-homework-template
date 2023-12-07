const express = require("express");

const AvatarController = require("../../controllers/avatar");
const UsersController = require("../../controllers/users");
const auth = require("../../middleware/auth");
const router = express.Router();

const jsonParser = express.json();

router.get("/avatars", auth, AvatarController.getAvatar);
router.patch("/avatars", auth, AvatarController.processAvatar, (req, res) => {
  res.status(200).json({ avatarURL: req.user.avatarURL });
});
router.post("/register", jsonParser, UsersController.register);
router.post("/login", jsonParser, UsersController.login);
router.post("/current", auth, jsonParser, UsersController.current);
router.post("/logout", auth, UsersController.logout);
router.get("/verify/:verificationToken", UsersController.verifyReg);
router.post("/verify", UsersController.resendRegEmail);

module.exports = router;
