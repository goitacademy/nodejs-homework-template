const express = require('express');
const router = express.Router();
const contactsController = require('../../Controllers/contactsContoller');
router.get('/', contactsController.listContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.addContact);
router.delete('/:id', contactsController.removeContact);
router.put('/:id', contactsController.updateContact);

module.exports = router;
