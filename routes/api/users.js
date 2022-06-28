const express = require('express')
const {users: ctrl} = require('../../src/controllers')

const router = express.Router()

router.get('/current', ctrl.getCurrent)

module.exports = router
