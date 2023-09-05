const express = require('express')
const router = express.Router()
const usersRoutes = require('./users')
const contactsRoutes = require('./contacts')

router.use('/users', usersRoutes)
router.use('/contacts', contactsRoutes)

module.exports = router
