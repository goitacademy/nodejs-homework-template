const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/users')
const guard = require('../../../helpers/guard')

const {
  validateCreateUser,
  validateLogin,
} = require('../../../validation/validate-user')

router.post('/signup', validateCreateUser, controller.reg)
router.post('/login', validateLogin, controller.login)
router.post('/logout', guard, controller.logout)
router.get('/current', guard, controller.current)

module.exports = router
