const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts') // create, getAll, getById, update, remove
const { addContact, updateContact } = require('../validation')

// === router CREATE ===
router.post('/', addContact, contactsController.create)

// === router GET ===
router.get('/', contactsController.getAll)

// === router GET 'Id' ===
router.get('/:contactId', contactsController.getById)

// === router PATCH ===
router.patch('/:contactId', updateContact, contactsController.update)

// === router DELETE ===
router.delete('/:contactId', contactsController.remove)

module.exports = router
