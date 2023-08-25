const express = require('express');

const ctrll = require('../../controllers/auth');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemaRegister, schemaLogin, schemaEmail } = require('../../schema');
const { schemaRefreshToken } = require('../../schema/schemaUser');

const router = express.Router();

/**
 * Sign-up
 */
router.post('/register', validateBody(schemaRegister), ctrll.register);

router.get('/verify/:verificationToken', ctrll.verifyEmail);

router.post('/verify', validateBody(schemaEmail), ctrll.resendVerifyEmail);

/**
 * Sign-in
 */
router.post('/login', validateBody(schemaLogin), ctrll.login);

router.post('/refresh', validateBody(schemaRefreshToken), ctrll.refresh);

/**
 * Logout user
 */
router.post('/logout', authenticate, ctrll.logout);

/**
 * Current user
 */
router.get('/current', authenticate, ctrll.current);

/**
 * User avatar
 */
router.patch('/avatars', authenticate, upload.single('avatar'), ctrll.updateAvatar);

module.exports = router;
