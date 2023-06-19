const express = require('express')
const router = express.Router()
const {listContacts, getContactById, removeContact, addContact, updateContact,} = require('../../models/contacts')


router.get('/', listContacts)

router.get('/:id', getContactById)

router.post('/', addContact)

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

module.exports = router
