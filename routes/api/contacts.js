const express = require('express')
const {getContacts, getContactById, addContact, changeContact, deleteContact} = require('../../controllers/contacts')
const schema = require('../../midlleware/validator/validatorJoi')
const schemaWrapper = require('../../helpers/schemaWrapper')
const router = express.Router()

router.get('/', getContacts)

router.get('/:contactId', getContactById)

router.post('/', schemaWrapper(schema),addContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', schemaWrapper(schema), changeContact)

module.exports = router
