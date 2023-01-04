const express = require('express')
const router = express.Router()

const {userValidation} = require('../middlewares/userValidation')
const { registrationController,
    loginController } = require('../../controllers/authControllers')

const { asyncWrapper } = require('../../helpers/apiHelpers')

router.post('/register', userValidation, asyncWrapper(registrationController))
router.post('/login', userValidation, asyncWrapper(loginController))


module.exports = {authRouter: router}