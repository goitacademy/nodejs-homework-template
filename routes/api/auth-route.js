const express = require('express');

const authController = require('../../controllers/auth-controller');
const schema = require('../../schemas/users');
const { validateBody } = require('../../decorators');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(schema.UserRegisterSchema), authController.signup);

router.post('/login', validateBody(schema.UserLoginSchema), authController.signin);

router.get('/current', authenticate, authController.getCurrent);

router.get('/logout', authenticate, authController.logout);

module.exports = router;
