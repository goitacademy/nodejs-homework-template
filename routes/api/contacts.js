const express = require('express')
const { getContacts, getContact, deleteContact, createContact, updateContact, updateStatus } = require('../../controllers/controllers')

const router = express.Router()

router.get('/', getContacts);

router.get('/:contactId', getContact)

router.post('/', createContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', updateContact)

router.patch('/:contactId/favorite', updateStatus)

module.exports = router
