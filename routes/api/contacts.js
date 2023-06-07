const express = require('express');

const router = express.Router();

const contactsControllers = require('../../controllers/contactsControllers');

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', contactsControllers.getContactsById);

router.post('/', contactsControllers.addContact);

router.delete('/:contactId', contactsControllers.deleteContactById);

router.put('/:contactId', contactsControllers.updateContactById);

module.exports = router;
