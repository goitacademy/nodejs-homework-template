const express = require('express')
const router = express.Router()

const { validation, controllerWrapper } = require("../../middlewares")

// const { contacts: ctrl } = require("../../controllers")

const { registrationController, loginController } = require("../../controllers/authController.js")


//-----------------------------------------------------------------------------
//! 1. Регистрация
router.post("/signup", controllerWrapper(registrationController))


//! 2. Login
router.post('/login', controllerWrapper(loginController))



// module.exports = { authRouter: router }
module.exports = router
