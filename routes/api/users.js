const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { auth, ctrlWrapper, upload } = require("../../middlewares");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
