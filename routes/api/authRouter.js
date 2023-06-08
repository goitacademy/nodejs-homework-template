const express = require("express");
const {authentificate} = require('../../utils/authentficate')
const { validateBody } = require('../../decorators/validateBody')
const { signup, login, logout, getCurrentUser, updateSubscription } = require('../../controllers/authControllers')
const {signupSchema, loginSchema, updateSubSchema} = require('../../schemas/authSchemas')

const router = express.Router()

router.post("/register", validateBody(signupSchema), signup)

router.post("/login", validateBody(loginSchema), login)

router.post('/logout', authentificate, logout)

router.get('/current', authentificate, getCurrentUser)

router.patch('/', authentificate, validateBody(updateSubSchema), updateSubscription)




module.exports = {authRouter: router}