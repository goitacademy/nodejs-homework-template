const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../../controllers/contacts');
const { checkUserById } = require('../../middleware/contacts');

router.get('/', listContacts);

router.post('/', addContact);

router.use('/:contactId', checkUserById);

router.get('/:contactId', getContactById);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', updateStatusContact);

module.exports = router;
