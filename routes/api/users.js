const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

const guard = require('../../helpers/guard')

router.post('/current', guard, userController.getCurrentUser)

module.exports = router
