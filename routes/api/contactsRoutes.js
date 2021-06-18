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
  changeFavouriteController,
} = require('../../controllers/contactsСontroller');

router.get('/', getContactsController);

router.get('/:contactId', getByIdController);

router.post('/', addContactValidation, addNewContactController);

router.delete('/:contactId', deleteContactController);

router.patch('/:contactId', patchContactValidation, changeContactController);

router.patch('/:contactId/favourite', changeFavouriteController);

module.exports = { contactsRouter: router };
