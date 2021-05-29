const express = require('express');
const router = express.Router();
const { validationAddedContact, validationUpdatedContact, validateMongoId } = require('./validation');
const Controllers = require('../../controllers/contacts-controllers');

router.get('/', Controllers.getAllContacts).post('/', validationAddedContact, Controllers.addContact);

router
  .get('/:contactId', validateMongoId, Controllers.getContactById)
  .delete('/:contactId', validateMongoId, Controllers.removeContact)
  .put('/:contactId', validateMongoId, validationUpdatedContact, Controllers.updateContact);

module.exports = router;
