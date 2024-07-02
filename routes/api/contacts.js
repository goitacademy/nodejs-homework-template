const express = require('express');
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.post('/', addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', updateContact);
router.patch('/:contactId/favorite', updateStatusContact);

module.exports = router;
