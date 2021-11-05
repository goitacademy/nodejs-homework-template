const express = require('express');
const router = express.Router();
const { registration, login, logout,getCurrentUser, uploadAvatar } = require('../../controllers/users');
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rateLimitLogin');
const upload = require('../../helpers/uploads')

router.post('/signup', registration);
router.post('/login', loginLimit, login);
router.post('/logout', guard, logout);

router.patch('/avatar', guard, upload.single('avatarURL'),uploadAvatar);

router.get('/current', guard, getCurrentUser);
module.exports = router;
