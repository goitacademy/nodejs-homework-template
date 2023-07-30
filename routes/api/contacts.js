const express = require('express');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact } = require("../../controllers/contacts");
const {schemas} = require("../../models/contact");
const {validateBody, isValidId} = require("../../middlewares");

const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(schemas.contactsBasicSchema), addContact);
router.delete('/:contactId', isValidId, removeContact);
router.put('/:contactId', isValidId, validateBody(schemas.contactsBasicSchema), updateContact);
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.favoriteschema), updateStatusContact);

module.exports = router;