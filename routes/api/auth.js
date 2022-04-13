const express = require('express')
const { validation, authenticate } = require('../../midlewares')
const { auth: ctrl } = require('../../controllers')
const { joiUserSchema } = require('../../models')

const router = express.Router()

router.post('/register', validation(joiUserSchema), ctrl.register)

router.post('/login', validation(joiUserSchema), ctrl.login)

router.post('/logout', authenticate, ctrl.logout)

router.get('/current', authenticate, ctrl.getCurrentUser)

module.exports = router
