const express = require('express');

const router = express.Router();
const {avatar: ctrl} = require('../../controllers');
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.patch('/avatars', auth, upload, ctrl.updateAvatar);

module.exports = router;