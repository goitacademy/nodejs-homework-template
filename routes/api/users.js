const express = require('express')

const {register, login, logout} = require('../../controllers/users');


const { joiUserSchema } = require("../../models/user");

const { validation } = require("../../middlewares");

const router = express.Router()


const userValidationMiddleware = validation(joiUserSchema);


router.post('/signup', userValidationMiddleware, register)
router.post('/login', userValidationMiddleware, login)
// router.get('/logout', logout)

module.exports = router;