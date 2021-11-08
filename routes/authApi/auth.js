const router = require('express').Router()
const checkValidity = require('../../middlewares/validation')
const { joiUserSchema } = require('../../schemas/joiSchemas')
const { authRegister, authLogin, authLogout } = require('../../controllers/auth')

router.post('/register', checkValidity(joiUserSchema), authRegister)

router.post('/login', authLogin)

router.get('/logout', authLogout)

module.exports = router
