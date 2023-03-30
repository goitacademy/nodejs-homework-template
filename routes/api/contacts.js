const express = require('express');
const contactsController = require('../../controllers/contactsController')
const { addContactValidator, updateContactValidator } = require('../../middlewars/validator');

const router = express.Router();

router
  .get('/', contactsController.getAllContacts)
  .get('/:contactId', contactsController.getById)
  .post('/', addContactValidator, contactsController.add)
  .delete('/:contactId', contactsController.remove)
  .put('/:contactId', updateContactValidator, contactsController.update);

module.exports = router;