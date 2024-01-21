const express = require("express");

const { user } = require("../../controllers");

const { authenticate, upload } = require("../../middlewares");


const router = express.Router();

router.patch('/avatar', authenticate ,upload.single('avatar'), user.updateAvatar)

module.exports = router;