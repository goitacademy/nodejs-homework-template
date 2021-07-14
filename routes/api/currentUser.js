const express = require('express')

const useAuth = require('./useAuth')

const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/users/current', useAuth, ctrl.getCurrentUser)

module.exports = router
