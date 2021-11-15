const router = require('express').Router()
const { checkValidity, controllerWrapper, authorize, upload } = require('../../middlewares')
const { joiUserSchema, joiPatchSubscriptionUserSchema } = require('../../schemas/joiSchemas')
const { authRegister, authLogin, authLogout, authCurrent, authPatchSub, authPatchAvatar } = require('../../controllers/auth')

router.post('/register', checkValidity(joiUserSchema), controllerWrapper(authRegister))

router.post('/login', checkValidity(joiUserSchema), controllerWrapper(authLogin))

router.get('/logout', authorize, controllerWrapper(authLogout))

router.get('/current', authorize, controllerWrapper(authCurrent))

router.patch('/current/subscription', authorize, checkValidity(joiPatchSubscriptionUserSchema), controllerWrapper(authPatchSub))

router.patch('/current/avatars', authorize, upload.single('avatarURL'), controllerWrapper(authPatchAvatar))

module.exports = router
