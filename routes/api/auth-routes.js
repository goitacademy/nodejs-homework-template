const express = require('express')
const router = express.Router()
const schemas = require('../../schemas/users')
const {validate, upload} = require('../../middlewars')
const authControllers = require('../../controllers/auth')
const {authenticate} = require('../../middlewars')

router.post("/register", validate.validateUserBody(schemas.userRegisterSchema), authControllers.register)

router.get("/verify/:verificationToken", authControllers.verify)

router.post("/verify", validate.validateEmail(schemas.userEmailSchema), authControllers.resendVerify)

router.post("/login", validate.validateUserBody(schemas.userLoginSchema), authControllers.login)

router.get("/current",  authenticate, authControllers.getCurrent)

router.post("/logout", authenticate, authControllers.logOut)

router.patch("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatar)

module.exports = router