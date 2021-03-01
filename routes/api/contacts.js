const express = require('express');
const router = express.Router();

const validate = require('./validation');
const contactsController = require('../../controllers/contacts');

router
  .get('/', contactsController.getAll)
  .post('/', validate.addContact, contactsController.create);

router
  .get('/:id', contactsController.getById)
  .delete('/:id', contactsController.remove)
  .put('/:id', validate.updateContact, contactsController.update)
  .patch('/:id', validate.updateContact, contactsController.updateStatus);

module.exports = router;
