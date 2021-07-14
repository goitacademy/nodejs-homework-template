const express = require('express')

const { auth: ctrl } = require('../../controllers')

const useAuth = require('./useAuth')

const router = express.Router()

router.post('/users/signup', express.json(), ctrl.register)

router.post('/users/login', express.json(), ctrl.login)

router.post('/users/logout', useAuth, ctrl.logout)

module.exports = router
