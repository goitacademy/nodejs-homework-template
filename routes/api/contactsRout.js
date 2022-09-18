const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')

router.get('/', listContacts)

router.get('/:id', getContactById)

// { name, email, phone } validation
router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)


module.exports = { contactsRouter: router }
