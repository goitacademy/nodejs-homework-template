const express = require('express');

const { users: ctrl } = require('../../controllers');
const { auth, upload } = require('../../middlewares');

const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.current);

router.patch('/', auth, ctrl.updateSubscribtion);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
