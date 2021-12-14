const express = require('express');

const { userCurrent, uploadAvatar } = require('../../middlewares');
const { uploadAvatars: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/', userCurrent, uploadAvatar.single('image'), ctrl.uploadAvatars);

module.exports = router;
