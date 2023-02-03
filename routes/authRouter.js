const express = require('express');
const router = express.Router();
const {asyncWrapper} = require("../helpers/apiHelpers")

const {
    registrationController,
    loginController  
} = require("../controllers/authController")

 router.post('/registration', asyncWrapper(registrationController));
 router.post('/login', asyncWrapper(loginController));


module.exports =  router;
