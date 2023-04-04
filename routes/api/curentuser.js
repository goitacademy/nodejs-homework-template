const express = require('express');

const router = express.Router();

const auth = require("../../middlewares/auth");

const {currentUser: ctrl} = require("../../controllers");
const upload = require("../../middlewares/upload");
const {validation} = require("../../middlewares/validation");
const {verifyEmailSchema} = require("../../models/users");


router.get("/current", auth, ctrl.getCurrent);
router.patch('/avatars', auth, upload.single("avatar"), ctrl.updateAvatar);
router.get("/verify/:verificationToken ", ctrl.verifyEmail);
router.post("/verify", validation(verifyEmailSchema), ctrl.writeVerifyEmail)

module.exports = router;