const { register, login, getCurrent, logout, updateAvatar } = require("../../controller/index");
const { authenticate } = require("../../middlewares");
const { upload } = require('../../middlewares/upload');

const express = require("express");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/users/avatars", authenticate, upload.single('avatarURL'), updateAvatar);

module.exports = router;