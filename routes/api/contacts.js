const express = require('express');

const router = express.Router();

const {
  addContactValidation,
} = require('../../middleware/validationMiddleware');

const {
  getListContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require('../../controllers/contactController');

router.get('/', getListContactsController);
router.get('/:contactId', getContactByIdController);
router.post('/', addContactValidation, addContactController);
router.put('/:contactId', addContactValidation, updateContactController);
router.delete('/:contactId', deleteContactController);

module.exports = router;
