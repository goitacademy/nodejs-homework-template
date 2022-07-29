const express = require('express')
const { controllerWrapper, validation} = require("../../middlewares");
const user = require("../../controllers/users");
const { registerSchema } = require('../../models/user')
// , joiLoginSchema, subscriptionJoiSchema
const router = express.Router()
router.post('/signup', controllerWrapper(user.signup))
router.post('/login',controllerWrapper(user.login))
module.exports = router;