const express = require('express')
const router = express.Router()

const { validation, controllerWrapper } = require("../../middlewares")

const {
    registrationController,
    loginController
} = require("../../controllers/authController.js")

const {
    registerJoiSchema,
    loginJoiSchema
} = require("../../models/userModel.js");

const validateMiddlewareRegister = validation(registerJoiSchema);
const validateMiddlewarelogin = validation(loginJoiSchema);


//-----------------------------------------------------------------------------
//! 1. Регистрация
router.post("/signup", validateMiddlewareRegister, controllerWrapper(registrationController))


//! 2. Login
router.post('/login', validateMiddlewarelogin, controllerWrapper(loginController))



// module.exports = { authRouter: router }
module.exports = router
