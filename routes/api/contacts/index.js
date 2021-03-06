const express = require('express')
const router = express.Router()
const contactsController = require('../../../controllers/contacts') // create, getAll, getById, update, remove
const { addContact, updateContact } = require('../contacts/validation')
const guard = require('../../../helpers/guard')

// === router CREATE ===
router.post('/', guard, addContact, contactsController.create)

// === router GET ===
router.get('/', guard, contactsController.getAll)

// === router GET 'Id' ===
router.get('/:contactId', guard, contactsController.getById)

// === router PATCH ===
router.patch('/:contactId', guard, updateContact, contactsController.update)

// === router DELETE ===
router.delete('/:contactId', guard, contactsController.remove)

module.exports = router
