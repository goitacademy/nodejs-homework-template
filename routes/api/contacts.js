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
const { contactsAddSchema } = require('../../schemas/contacts');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateBody(contactsAddSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateBody(contactsAddSchema), updateContact);

module.exports = router;
