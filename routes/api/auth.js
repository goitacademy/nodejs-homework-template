const express = require('express')
const {controllerWrapper, validation} = require("../../middlewares");
const authController = require('../../controllers/auth')
const {userJoiSchema} = require('../../models/user')

const router = express.Router()
// api/auth/register
router.post('/register',validation(userJoiSchema),controllerWrapper(authController.register))

router.post('/login', validation(userJoiSchema), controllerWrapper(authController.login))

router.get('/logout', controllerWrapper(authController.logout))

module.exports = router