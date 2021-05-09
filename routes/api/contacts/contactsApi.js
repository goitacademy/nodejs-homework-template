const express = require('express');
const router = express.Router();

const validate = require('./contactValidation');
const contactsController = require('../../../controllers/contacts');
const guard = require('../../../helper/quard');

router
  .get('/', guard, contactsController.getAllContact)
  .post('/', guard, validate.createContact, contactsController.createContact);

router
  .get('/:contactId', guard, contactsController.getContactById)
  .delete('/:contactId', guard, contactsController.deleteContact)
  .put(
    '/:contactId',
    guard,
    validate.updateContact,
    contactsController.updateContact
  );

router.patch(
  '/:contactId/favorite',
  guard,
  validate.patchContact,
  contactsController.updateStatusContact
);

module.exports = router;
