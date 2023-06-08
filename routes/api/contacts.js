const express = require('express');

const router = express.Router();

const contactsControllers = require('../../controllers/contacts');

const { isValidId } = require('../../middlewares');

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', isValidId, contactsControllers.getContactById);

router.post('/', contactsControllers.addContact);

router.delete('/:contactId', isValidId, contactsControllers.deleteContactById);

router.put('/:contactId', isValidId, contactsControllers.updateContactById);

router.patch('/:contactId/favorite', isValidId, contactsControllers.updateStatusContact);

module.exports = router;
