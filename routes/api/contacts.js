const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../models/contacts');
const router = express.Router()

router.get('/', listContacts)

router.get("/:contactId", getContactById);

router.post('/', addContact)

router.delete("/:contactId", removeContact);

router.put('/:contactId', updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router
