const express = require('express')

const ctrl = require('../../controllers/auth');
const { authenticate, upload, resizeAvatar } = require('../../middlewares');

const router = express.Router()

router.get('/verify/:verificationToken', ctrl.verification)
router.post('verify', ctrl.verify)
router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', authenticate, ctrl.logout);
router.get('/current', authenticate, ctrl.login);
router.patch('/avatars', authenticate, upload.single('avatar'), resizeAvatar, ctrl.patchAvatar);

module.exports = router;