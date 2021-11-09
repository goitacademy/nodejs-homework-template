const router = require('express').Router()
const { checkValidity, controllerWrapper } = require('../../middlewares')
const { joiUserSchema } = require('../../schemas/joiSchemas')
const { authRegister, authLogin, authLogout } = require('../../controllers/auth')

router.post('/register', checkValidity(joiUserSchema), controllerWrapper(authRegister))

router.post('/login', controllerWrapper(authLogin))

router.get('/logout', controllerWrapper(authLogout))

module.exports = router
