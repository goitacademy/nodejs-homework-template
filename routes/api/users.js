const express = require('express');

const ctrlUsers = require('../../controller/users');
const { auth } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.get('/current', auth, ctrlUsers.get);
router.patch('/avatar', auth, upload.single('avatar'), ctrlUsers.changeAvatar);
router.get("/verify/:verificationToken",  ctrlUsers.verifyEmail);

module.exports = router