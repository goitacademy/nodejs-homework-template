const express = require('express')

const useAuth = require('./useAuth')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/profile', useAuth, ctrl.getProfile)

module.exports = router
