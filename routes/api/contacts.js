const express = require('express');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact } = require("../../controllers/contacts");
const {schemas} = require("../../models/contact");
const {validateBody, isValidId, authenticate} = require("../../middlewares");

const router = express.Router();

router.get('/', authenticate, listContacts);
router.get('/:contactId', authenticate, isValidId, getContactById);
router.post('/', authenticate, validateBody(schemas.contactsBasicSchema), addContact);
router.delete('/:contactId', authenticate, isValidId, removeContact);
router.put('/:contactId', authenticate, isValidId, validateBody(schemas.contactsBasicSchema), updateContact);
router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.favoriteschema), updateStatusContact);

module.exports = router;