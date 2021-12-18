const express = require('express');

const { userCurrent, uploadAvatar } = require('../../middlewares');
const { avatars: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/', userCurrent, uploadAvatar.single('avatar'), ctrl.uploadAvatars);
// router.get('/:avatar', ctrl.getAllAvatars);

module.exports = router;
