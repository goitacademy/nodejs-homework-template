const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { userRegisterValidation } = require('../../middlewares');
const { registerController
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// GET all contacts
router.post('/register', userRegisterValidation, controllerCheck(registerController));



module.exports = router;
