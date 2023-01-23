const express = require('express');
const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  checkAuth,
} = require('../../middlewares/index');

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require('../../controllers/contactsController');

router.get('/', checkAuth, getContactsList);
router.get('/:contactId', checkAuth, getContactById);
router.post('/', checkAuth, addContactValidation, addContact);
router.delete('/:contactId', checkAuth, removeContact);
router.put('/:contactId', checkAuth, updateContactValidation, updateContact);
router.patch(
  '/:contactId/favorite',
  checkAuth,
  updateStatusValidation,
  updateStatus
);

module.exports = router;
