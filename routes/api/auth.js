const express = require('express')
const router = express.Router()
const authCtrl = require('../../controllers/auth')
const { joiUserSchema } = require('../../middlewares/validation/joiSchema')
const validation = require('../../middlewares/validation/validation')
const controllerWrapper = require('../../middlewares/controllerWrapper')

const validUser = validation(joiUserSchema)

router.post('/signup', validUser, controllerWrapper(authCtrl.signup))

router.post('/login', validUser, controllerWrapper(authCtrl.login))

// router.get('/logout', controllerWrapper(authCtrl.logout))

// router.get('/current', authCtrl.current)

module.exports = router
