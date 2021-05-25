const router = require('express').Router()
const contactsRouter = require('./contacts.router')
const usersRouter = require('./users.router')

router.use('/api', contactsRouter)

router.use('/users', usersRouter)

module.exports = router
