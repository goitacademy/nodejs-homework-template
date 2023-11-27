const express = require("express");
const avatarControll = require("../../controll/avatars");
const upload = require("../../middlewares/avatarsUpload");

const router = express.Router();

router.patch("/avatars", upload.single("avatar"), avatarControll.uploadAvatar);

module.exports = router;