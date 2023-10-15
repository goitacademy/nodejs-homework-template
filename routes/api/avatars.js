const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");
const { uploadAvatar } = require("../../Controllers/avatarController");
const authMiddleware = require("../../Users/authMiddleware");

router.patch("/", authMiddleware, upload.single("avatar"), uploadAvatar);

module.exports = router;
