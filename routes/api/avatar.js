const express = require('express');

const router = express.Router();
const {avatar: ctrl} = require('../../controllers');
const auth = require("../../middlewares/auth");

router.patch('/avatars', auth, ctrl.updateAvatar);

module.exports = router;