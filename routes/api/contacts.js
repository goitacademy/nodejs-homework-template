const express = require('express');
const authenticate = require('../../middlewares/auth');
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = require('../../controllers/contacts');

const router = express.Router();

router.use(authenticate); // Ochrona tras

router.get('/', getAllContacts);
router.get('/:contactId', getContactById);
router.post('/', addContact);
router.put('/:contactId', updateContact);
router.delete('/:contactId', deleteContact);

module.exports = router;
