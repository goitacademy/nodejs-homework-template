const express = require('express');
const router = express.Router();

const {
  patchContactValidation,
  addContactValidation,
  patchFavouriteValidation,
} = require('../../middlewares/validationMiddleware');

const {
  changeContactController,
  addNewContactController,
  deleteContactController,
  getByIdController,
  getContactsController,
  changeFavouriteController,
} = require('../../controllers/contactsСontroller');

const { asyncWrapper } = require('../../helpers/asyncWrapper');
const {
  authenticationMiddleware,
} = require('../../middlewares/authenticationMiddleware');

router.use(authenticationMiddleware);

router.get('/', asyncWrapper(getContactsController));

router.get('/:contactId', asyncWrapper(getByIdController));

router.post('/', addContactValidation, asyncWrapper(addNewContactController));

router.delete('/:contactId', asyncWrapper(deleteContactController));

router.patch(
  '/:contactId',
  patchContactValidation,
  asyncWrapper(changeContactController),
);

router.patch(
  '/:contactId/favourite',
  patchFavouriteValidation,
  asyncWrapper(changeFavouriteController),
);

module.exports = { contactsRouter: router };
