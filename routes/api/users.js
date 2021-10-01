const express = require('express')

const { controllerWrapper, validation } = require('../../middelwares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', controllerWrapper(ctrl.signup))

router.post('/login', controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(ctrl.logout))

module.exports = router
