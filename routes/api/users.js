const express = require('express')
const {auth, controllerWrapper, validation,upload} = require("../../middlewares");
const user = require("../../controllers/users");
const { registerSchema,loginSchema} = require('../../models/user')
const router = express.Router()
router.post('/signup',validation(registerSchema), controllerWrapper(user.signup))
router.post('/login', validation(loginSchema), controllerWrapper(user.login))
router.get('/current', auth, controllerWrapper(user.getCurrent))
router.get('/logout', auth, controllerWrapper(user.logout))
router.patch('/avatars', auth, upload.single("avatar"), controllerWrapper(user.updateAvatar))
router.get("/verify/:vertificationToken", controllerWrapper(user.verifyEmail))
router.post( "/verify",controllerWrapper(user.verify))
module.exports = router;