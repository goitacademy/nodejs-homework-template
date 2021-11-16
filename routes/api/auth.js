const express = require('express')
const router = express.Router()

const authCtrl = require('../../controllers/auth')
const { joiUserSchema } = require('../../middlewares/validation')
const { validation } = require('../../middlewares/validation')
const { controllerWrapper, authenticate, uploadImg } = require('../../middlewares')

const validUser = validation(joiUserSchema)

router.post('/signup', validUser, controllerWrapper(authCtrl.signup))

router.post('/login', validUser, controllerWrapper(authCtrl.login))

router.get('/logout', controllerWrapper(authenticate), controllerWrapper(authCtrl.logout))

router.get('/current', controllerWrapper(authenticate), controllerWrapper(authCtrl.current))

router.patch('/subscription', controllerWrapper(authenticate), controllerWrapper(authCtrl.subscription))

// router.patch('/avatars/:contactId',uploadImg.single('img'), controllerWrapper(authCtrl.updImg))
router.patch('/avatars', uploadImg.single('img'), controllerWrapper(authenticate), controllerWrapper(authCtrl.updImg))

module.exports = router
