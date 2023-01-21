const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

const router = express.Router();

const { schemas } = require('../../models/user');

router.post('/signup', validateBody(schemas.signupSchema), ctrl.signup);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', ctrl.getCurrent);
router.post('/logout', ctrl.logout);

module.exports = router;
