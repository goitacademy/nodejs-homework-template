const express = require('express');
const router = express.Router();

const {
  patchContactValidation,
  addContactValidation,
} = require('../../middlewares/validationMiddleware');

const {
  changeContactController,
  addNewContactController,
  deleteContactController,
  getByIdController,
  getContactsController,
} = require('../../controllers/contactsСontroller');

router.get('/', getContactsController);

router.get('/:contactId', getByIdController);

router.post('/', addContactValidation, addNewContactController);

router.delete('/:contactId', deleteContactController);

router.patch('/:contactId', patchContactValidation, changeContactController);

module.exports = { contactsRouter: router };
