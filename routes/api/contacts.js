const contactsController = require('../../model/index');
  
const express = require('express');
const router = express.Router();

router
  .get('/', contactsController.listContacts)
  .post('/', contactsController.addContact);

router
  .get('/:contactId', contactsController.getContactById)
  .delete('/:contactId', contactsController.removeContact)
  .patch('/:contactId', contactsController.updateContact);

module.exports = router;
////