const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../models/contacts');
const { checkContactById, checkCreateContactData, checkUpdateContactData } = require('../../middlewares/contactMiddlewares');

const router = express.Router()

router.get('/', listContacts);

router.get('/:contactId', checkContactById,  getContactById);

router.post('/', checkCreateContactData, addContact);

router.delete('/:contactId', checkContactById, removeContact);

router.put('/:contactId', checkContactById, checkUpdateContactData, updateContact);

router.patch('/:contactId/favorite', checkContactById, updateStatusContact);

module.exports = router