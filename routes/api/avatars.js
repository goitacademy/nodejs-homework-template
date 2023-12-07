const express = require("express");
const avatarControll = require("../../controll/avatars");
const upload = require("../../middlewares/avatarsUpload");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.patch(
    "/avatars",
    auth,
    upload.single("avatar"),
    avatarControll.uploadAvatar
);

module.exports = router;