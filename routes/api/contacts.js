const express = require('express')
const { getContacts, getContact, deleteContact, createContact, updateContact } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', getContacts);

router.get('/:contactId', getContact)

router.post('/', createContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContact)

module.exports = router
