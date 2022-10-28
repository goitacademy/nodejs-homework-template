const express = require("express");
const ctrl = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", upload.single("avatarURL"), ctrl.signup);
router.post("/login", ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.current);
router.patch(
	"/avatars",
	authenticate,
	upload.single("avatarURL"),
	ctrl.updateAvatar
);

module.exports = router;
