const express = require('express');
const router = express.Router();
const validate = require('./validation');
const contactsController = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, contactsController.getAll)
  .post('/', guard, validate.createContact, contactsController.create);

router
  .get('/:contactId', guard, contactsController.getById)
  .delete('/:contactId', guard, contactsController.remove)
  .patch(
    '/:contactId',
    guard,
    validate.updateContact,
    contactsController.update
  );

module.exports = router;
