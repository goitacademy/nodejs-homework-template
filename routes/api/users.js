const express = require('express')

const { users: ctrl } = require('../../controllers')
const { controllerWrapper, authenticate } = require('../../middlewares')

const router = express.Router()

router.get('/', controllerWrapper(authenticate), ctrl.getUser)

module.exports = router
