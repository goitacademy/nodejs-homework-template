const express = require("express");

const { catchAsync } = require("../../utils");
const { authController } = require('../../controllers');
const { checkUser, checkAuth } = require("../../middlewares");


const router = express.Router();

router.post('/register', checkUser.checkRegisterUserData, catchAsync(authController.register));
router.post('/login', checkUser.checkLoginUserData, catchAsync(authController.login))
router.post('/logout', checkAuth, catchAsync(authController.logout));

module.exports = router;