const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { userRegisterValidation, userLoginValidation } = require('../../middlewares');
const { registerController, loginController
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// GET all contacts
router.post('/register', userRegisterValidation, controllerCheck(registerController));

router.post('/login', userLoginValidation, controllerCheck(loginController))


module.exports = router;
