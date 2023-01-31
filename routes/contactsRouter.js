const express = require('express');
const router = express.Router();
const asyncWrapper = require("../helpers/apiHelpers")
const {
  addContactValidation,
  putContactValidation
} = require("../middlewares/validationMiddleware")
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  putContacts
} = require("../controllers/contactsController")

router.get('/', asyncWrapper(getContacts));
router.get('/:contactId', asyncWrapper(getContactById));
router.post('/', addContactValidation, asyncWrapper(addContact));
router.delete('/:contactId', asyncWrapper(deleteContact));
router.put('/:contactId', putContactValidation, asyncWrapper(putContacts));
router.patch('/:contactId/favorite',)

module.exports = router;
