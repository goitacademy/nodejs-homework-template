const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../controllers/contactsController');

const router = express.Router();

router.route('/').get(listContacts).post(addContact);

router
  .route('/:contactId')
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
