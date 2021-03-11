const express = require('express')
const router = express.Router()
const ContactsController = require('../../../controllers/contacts.js')
const guard = require('../../../model/helpers/guard')

router.get('/', guard, ContactsController.list)
router.get('/:contactId', guard, ContactsController.getById)
router.delete('/:contactId', guard, ContactsController.remove)
router.patch('/:contactId', guard, ContactsController.update)
router.post('/', guard, ContactsController.create)

module.exports = router
