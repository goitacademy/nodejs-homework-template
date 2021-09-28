const express = require('express')

const { validation, authenticate } = require('../../middlewares')
const { joiUserSchema } = require('../../schemas/user')
const register = require('../../controllers/auth/register')
const login = require('../../controllers/auth/login')
const logout = require('../../controllers/auth/logout')
const controllerWrapper = require('../../controllers/controllerWrapper')

const router = express.Router()

router.post('/register', validation(joiUserSchema), controllerWrapper(register))
// router.post("/signup", validation(joiUserSchema), controllerWrapper(signup));

router.post('/login', validation(joiUserSchema), controllerWrapper(login))
// router.post("/signin", validation(joiUserSchema), controllerWrapper(signin));

router.get('/logout', authenticate, controllerWrapper(logout))
// router.get("/signout", controllerWrapper(signout));

module.exports = router
