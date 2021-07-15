const express = require('express')

const { auth: ctrl } = require('../../controllers')

const useAuth = require('./useAuth')

const router = express.Router()

router.post('/signup', express.json(), ctrl.register)

router.post('/login', express.json(), ctrl.login)

router.post('/logout', useAuth, ctrl.logout)

module.exports = router
