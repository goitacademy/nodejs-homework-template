const express = require('express')
const router = express.Router()
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')

router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:contactId', updateContact)


module.exports = { contactsRouter: router }
