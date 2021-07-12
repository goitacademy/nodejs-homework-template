const express = require('express')

const useAuth = require('./useAuth')

const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/register', express.json(), ctrl.register)

router.post('/login', express.json(), ctrl.login)

router.get('/logout', useAuth, ctrl.logout)

module.exports = router
