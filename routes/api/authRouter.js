const express = require('express')
const router = express.Router()

const { validation, controllerWrapper, authMiddleware } = require("../../middlewares")

// const {
//     registrationController,
//     loginController
// } = require("../../controllers/authControllers/registrController.js")

const { authControllers: ctrl } = require("../../controllers")

const {
    registerJoiSchema,
    loginJoiSchema
} = require("../../models/userModel.js");

const validateMiddlewareRegister = validation(registerJoiSchema);
const validateMiddlewarelogin = validation(loginJoiSchema);


//-----------------------------------------------------------------------------
//! 1. Регистрация
router.post("/signup", validateMiddlewareRegister, controllerWrapper(ctrl.registrController))


//! 2. Login
router.post('/login', validateMiddlewarelogin, controllerWrapper(ctrl.loginController))


//! 3-1. Проверка токена
router.use(authMiddleware);

//! 3-2. Logout
router.get('/logout', controllerWrapper(ctrl.logoutController))



// module.exports = { authRouter: router }
module.exports = router
