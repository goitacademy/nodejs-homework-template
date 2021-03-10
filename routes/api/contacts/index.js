const express = require('express');
const router = express.Router();
const validate = require('./validation');
const contactsController = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, contactsController.getAll)
  .post('/', guard, validate.createContact, contactsController.create);

router
  .get('/:contactId', guard, validate.IDContact, contactsController.getById)
  .delete('/:contactId', guard, validate.IDContact, contactsController.remove)
  .patch(
    '/:contactId',
    guard,
    validate.IDContact,
    validate.updateContact,
    contactsController.update
  );

module.exports = router;
