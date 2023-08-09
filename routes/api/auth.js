const express = require('express');

const ctrll = require('../../controllers/auth');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemaRegister, schemaLogin } = require('../../schema');

const router = express.Router();

/**
 * Sign-up
 */
router.post('/register', validateBody(schemaRegister), ctrll.register);

/**
 * Sign-in
 */
router.post('/login', validateBody(schemaLogin), ctrll.login);

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
