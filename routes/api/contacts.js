const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controllers/contacts')

const {contactsSchema} = require('./contacts-validation-schem')
const {validate} = require('../../middlewares/validation')

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validate(contactsSchema), addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validate(contactsSchema), updateContact)

router.patch('/favorite/:contactId', updateStatusContact)

module.exports = router
