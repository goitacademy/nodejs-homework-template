const express = require('express');

const contactValidation = require('../../middlewares/validationMiddleware');
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts');

const router = express.Router()

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', contactValidation, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', contactValidation, updateContact)

module.exports = router;
