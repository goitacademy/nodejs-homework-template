const express = require('express')
const router = express.Router()
const { currentUser } = require('../../../controllers/users.js')
const guard = require('../../../model/helpers/guard')

router.get('/current', guard, currentUser)

module.exports = router
