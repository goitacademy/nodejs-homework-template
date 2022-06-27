const express = require('express')
const {users: ctrl} = require('../../src/controllers')
const {auth} = require('../../src/middlewares')

const router = express.Router()

router.get('/current', auth, ctrl.getCurrent)

module.exports = router
