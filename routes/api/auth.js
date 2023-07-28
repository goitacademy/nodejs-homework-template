const express = require('express');

const ctrll = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

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

module.exports = router;
