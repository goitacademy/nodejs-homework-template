const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts');
const {
  schemaCreateContact,
  schemaMongoId,
} = require('./contacts-validation-schemes');
const {
  validateBody,
  validateParams,
  validateUpdateFavorite,
} = require('../../middlewares/validation');
const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', validateParams(schemaMongoId), getContactById);

router.post('/', validateBody(schemaCreateContact), addContact);

router.delete('/:contactId', validateParams(schemaMongoId), removeContact);

router.put(
  '/:contactId',
  validateBody(schemaCreateContact),
  validateParams(schemaMongoId),
  updateContact,
);

router.patch("/:contactId/favorite", validateUpdateFavorite, updateContact);

module.exports = router;
