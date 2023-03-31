const express = require('express');

const router = express.Router();
const {users: ctrl} = require('../../controllers');
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.patch('/avatars', auth, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;