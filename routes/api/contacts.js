const express = require('express')
const router = express.Router()
const { getContacts, getContactById, addContact, deleteContact, updateContact, updateStatusContact} = require('../../controllers/contacts')
const { validateContact, validateId, validateStatusContact } = require('./validations')

router.get('/', getContacts)

router.get('/:contactId', validateId, getContactById)

router.post('/', validateContact, addContact)

router.delete('/:contactId', validateId, deleteContact)

router.put('/:contactId', validateId, validateContact, updateContact)

router.patch('/:contactId/favorite', [validateId, validateStatusContact], updateStatusContact)

module.exports = router
