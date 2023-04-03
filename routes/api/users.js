const express = require('express');
const { usersController } = require('../../controllers');
const { checkAuth, uploadUserAvatar } = require('../../middlewares');

const router = express.Router();

router.get('/current', checkAuth, usersController.getCurrent);
router.patch('/avatars', checkAuth, uploadUserAvatar, usersController.updateAvatars);

module.exports = router;