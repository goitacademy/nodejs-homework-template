const express = require('express');
const router = express.Router();

const validate = require('./validation');
const contactsController = require('../../controllers/contacts');

router
  .get('/', contactsController.getAllContact)
  .post('/', validate.createContact, contactsController.createContact);

router
  .get('/:contactId', contactsController.getContactById)
  .delete('/:contactId', contactsController.deleteContact)
  .put('/:contactId', validate.updateContact, contactsController.updateContact);

router.patch(
  '/:contactId/favorite',
  validate.patchContact,
  contactsController.updateStatusContact
);

module.exports = router;
