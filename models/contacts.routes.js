const express = require('express')
const router = express.Router()
const contactsController = require('../controller')

router.get('/contacts', contactsController.get)

router.get('/contacts/:id', contactsController.getById)

router.post('/contacts', contactsController.create)

router.put('/contacts/:id', contactsController.update)

router.patch('/contacts/:id/status', contactsController.updateStatus)

router.delete('/contacts/:id', contactsController.remove)

module.exports = router
