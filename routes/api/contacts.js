const express = require('express');
const contactsController = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', contactsController.getContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', contactsController.createContact);

router.delete('/:contactId', contactsController.deleteContact);

router.put('/:contactId', contactsController.updateContact);

module.exports = router;
