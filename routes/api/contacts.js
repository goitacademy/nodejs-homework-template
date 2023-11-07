const express = require('express')

const router = express.Router()

const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../models/contacts');


router.get('/api/contacts', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.delete('/:contactId', removeContact)

router.put('/:contactId', updateContact);

module.exports = router
