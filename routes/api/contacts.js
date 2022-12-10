const express = require('express')
const {getContacts, getContactId, addContact, changeContact, deleteContact, updateStatusContact} = require('../../controllers/contacts')
const schema = require('../../midlleware/validator/validatorJoi')
const schemaWrapper = require('../../helpers/schemaWrapper')
const router = express.Router()

router.get('/', getContacts)

router.get('/:contactId', getContactId)

router.post('/', schemaWrapper(schema),addContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', schemaWrapper(schema), changeContact)

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router
