const express = require('express')
const router = express.Router()
const { validateAuth } = require('./authvalidate')
const authenticate = require('../../middlewares/autenticate')
const upload = require('../../middlewares/upload')
const controllerWrapper = require('../../middlewares/controllerWrapper')
const { registration, login, logout, getCurrentUser, uploadAvatar} = require('../../controllers/auth')


router.post('/signup', validateAuth, controllerWrapper(registration))

router.post('/login', validateAuth, controllerWrapper(login))

router.post('/logout', authenticate, controllerWrapper(logout))

router.get('/current', authenticate, controllerWrapper(getCurrentUser))

router.patch('/avatar', authenticate, upload.single('avatar'), controllerWrapper(uploadAvatar))


module.exports = router