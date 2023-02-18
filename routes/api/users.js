const express = require("express");

const { ctrlWrapper, upload, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { authValidation } = require("../../middlewares");

const router = express.Router();

router.get("/current", authValidation, auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
module.exports = router;
