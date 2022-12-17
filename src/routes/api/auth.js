const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { userRegisterValidation, userLoginValidation, auth } = require('../../middlewares');
const { registerController, loginController, currentUserController, logoutUserController
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// register new user
router.post('/register', userRegisterValidation, controllerCheck(registerController));
// login
router.post('/login', userLoginValidation, controllerCheck(loginController))

// get current user
router.get('/current', auth, controllerCheck(currentUserController));

// POST logout
router.post('/logout', auth, controllerCheck(logoutUserController))

module.exports = router;
