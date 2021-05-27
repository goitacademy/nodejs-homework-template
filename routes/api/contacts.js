const express = require('express')
const router = express.Router()
const ctrlContacts = require('../../controller/contacts')
const { validateContact } = require('../../services/validationContact.js')
const auth = require('../../services/auth')

router.get('/', auth, ctrlContacts.get)

router.get('/:contactId', auth, ctrlContacts.getById)

router.post('/', auth, validateContact, ctrlContacts.create)

router.delete('/:contactId', auth, ctrlContacts.remove)

router.put('/:contactId', auth, validateContact, ctrlContacts.update)

router.patch('/:contactId/favorite', auth, ctrlContacts.updateStatus)

module.exports = router
