const express = require('express');
const router = express.Router();
const asyncWrapper = require("../helpers/wrapperController")
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

module.exports = router;
