const express = require('express')
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact } = require('../../controllers/contacts')
    
const isValidId = require('../../middlewares/isValid')

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', isValidId, getContactById)

router.post('/', addContact)

router.delete('/:contactId', isValidId, removeContact)

router.put('/:contactId', isValidId, updateContact)

module.exports = router
