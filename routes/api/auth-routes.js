const express = require('express')
const router = express.Router()
const schemas = require('../../schemas/users')
const {validate} = require('../../middlewars')
const authControllers = require('../../controllers/auth')


router.post("/register", validate.validateUserBody(schemas.userRegisterSchema), authControllers.register)


router.post("/login", validate.validateUserBody(schemas.userLoginSchema), authControllers.login)
module.exports = router