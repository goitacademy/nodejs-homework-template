const express = require('express')
const router = express.Router()
const { getContacts, getContactById, addContact, deleteContact, updateContact, updateStatusContact, getContactsByUser} = require('../../controllers/contacts')
const { validateContact, validateId, validateStatusContact } = require('./validations')
const authenticate = require('../../middlewares/autenticate')

// router.get('/', getContacts)

router.get('/:contactId', authenticate, validateId, getContactById)

router.post('/', authenticate, validateContact, addContact)

router.get('/', authenticate, getContactsByUser)

router.delete('/:contactId', authenticate, validateId, deleteContact)

router.put('/:contactId', authenticate, validateId, validateContact, updateContact)

router.patch('/:contactId/favorite', authenticate, [validateId, validateStatusContact], updateStatusContact)

module.exports = router
