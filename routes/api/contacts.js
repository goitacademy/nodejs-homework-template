const express = require('express');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require("../../controllers/contacts");
const {contactsSchema} = require("../../shemas");
const {validateBody} = require("../../middlewares");

const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', validateBody(contactsSchema), addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', validateBody(contactsSchema), updateContact);

module.exports = router;