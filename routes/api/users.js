
const express = require('express');

const ctrl = require('../../controllers/auth');

const router = express.Router();

const { authoriz, upload } = require('../../middelwares');

router.post('/signup', ctrl.signup);

router.post('/login', ctrl.login);

router.get('/current', authoriz, ctrl.current);

router.get('/logout', authoriz, ctrl.logout);

router.patch('/avatars', authoriz, upload.single('avatar'), ctrl.avatars);

router.get('/verify/:verificationToken', ctrl.verifyToken);

router.post('/verify', ctrl.verifyRepit);

module.exports = router;