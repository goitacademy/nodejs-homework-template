const express = require('express');

const authController = require('../../controllers/auth-controller');
const schema = require('../../schemas/users');
const { validateBody } = require('../../decorators');

const router = express.Router();

router.post('/signup', validateBody(schema.UserRegisterSchema), authController.signup);

router.post('/signin', validateBody(schema.UserLoginSchema), authController.signin);

module.exports = router;
