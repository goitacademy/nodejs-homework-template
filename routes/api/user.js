const express = require('express');

const { userAuthMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router();

router.post('/register', userAuthMiddlewares.checkRegistrations, userController.registerUser);
// router.post('/login', userAuthMiddlewares.checkRegistrations, userController.LoginUser);

module.exports = router