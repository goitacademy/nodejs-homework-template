const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controllers/contacts');
const { checkContactById, checkCreateContactData, checkUpdateContactData } = require('../../middlewares/contactMiddlewares');
const {auth} = require('../../middlewares/userMiddlewares')

const router = express.Router()

router.get('/', auth, listContacts);

router.get('/:contactId', checkContactById,  getContactById);

router.post('/', auth,  checkCreateContactData, addContact);

router.delete('/:contactId', checkContactById, removeContact);

router.put('/:contactId', checkContactById, checkUpdateContactData, updateContact);

router.patch('/:contactId/favorite', checkContactById, updateStatusContact);

module.exports = router