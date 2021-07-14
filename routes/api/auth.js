const express = require('express')

const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/users/signup', express.json(), ctrl.register)

router.post('/users/login', express.json(), ctrl.login)

module.exports = router
