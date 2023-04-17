const express = require('express');

const { auth, upload, control } = require('../../middlewares/');

const {
  users: { getCurrent, updateAvatar, verifyEmail, resendEmail },
} = require('../../controllers');

const router = express.Router();

router.get('/current', control(auth), control(getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), control(updateAvatar));
router.get('/auth/:verificationToken', control(verifyEmail));
router.post('/auth', control(resendEmail));
module.exports = router;
