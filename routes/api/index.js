const express = require('express')
const router = express.Router()
const usersRoutes = require('./users')
const contactsRoutes = require('./contacts')
const auth = require("../../middleware/auth.js")

router.use('/users', usersRoutes)
router.use('/contacts', auth, contactsRoutes)

module.exports = router