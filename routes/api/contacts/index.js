const express = require('express');
const router = express.Router();

const validate = require('./validation');
const contactsController = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, contactsController.getAll)
  .post('/', guard, validate.addContact, contactsController.create);

router
  .get('/:id', guard, contactsController.getById)
  .delete('/:id', guard, contactsController.remove)
  .put('/:id', guard, validate.updateContact, contactsController.update)
  .patch(
    '/:id',
    guard,
    validate.updateContact,
    contactsController.updateStatus,
  );

module.exports = router;
