const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../controllers/contacts-controller');

const validateBody = require('../../decorators/validateBody');
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('../../schemas/contacts');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateBody(contactsAddSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateBody(contactsUpdateSchema), updateContact);

module.exports = router;
