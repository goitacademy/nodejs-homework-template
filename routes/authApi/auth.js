const router = require('express').Router()
const { checkValidity, controllerWrapper, authorize } = require('../../middlewares')
const { joiUserSchema } = require('../../schemas/joiSchemas')
const { authRegister, authLogin, authLogout, authCurrent } = require('../../controllers/auth')

router.post('/register', checkValidity(joiUserSchema), controllerWrapper(authRegister))

router.post('/login', checkValidity(joiUserSchema), controllerWrapper(authLogin))

router.get('/logout', authorize, controllerWrapper(authLogout))

router.get('/current', authorize, controllerWrapper(authCurrent))

module.exports = router
