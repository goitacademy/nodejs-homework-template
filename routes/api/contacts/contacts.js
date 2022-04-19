const express = require('express');
const router = express.Router();
const { ContactsRoutePaths } = require('../../../helpers/routePaths');
const {
  validationAddedContact,
  validationUpdatedContact,
  validateMongoId,
  validateUpdateFavorite
} = require('./validation');
const Controllers = require('../../../controllers/contacts-controllers');

router
  .get(ContactsRoutePaths.home, Controllers.getAllContacts)
  .post(ContactsRoutePaths.home, validationAddedContact, Controllers.addContact);

router
  .get(ContactsRoutePaths.contactId, validateMongoId, Controllers.getContactById)
  .delete(ContactsRoutePaths.contactId, validateMongoId, Controllers.removeContact)
  .put(ContactsRoutePaths.contactId, validateMongoId, validationUpdatedContact, Controllers.updateContact);

router.patch(ContactsRoutePaths.favorite, validateMongoId, validateUpdateFavorite, Controllers.updateStatusContact);

module.exports = router;