const express = require('express');
const router = express.Router();
const validate = require('./validation');
const contactsController = require('../../controllers/contacts');

router
  .get('/', contactsController.getAll)
  .post('/', validate.createContact, contactsController.create);

router
  .get('/:contactId', contactsController.getById)
  .delete('/:contactId', contactsController.remove)
  .patch('/:contactId', validate.updateContact, contactsController.update);

module.exports = router;
