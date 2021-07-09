const express = require('express')
const router = express.Router()

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../handlers/handlers')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', express.json(), addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', express.json(), updateContact)

module.exports = router
