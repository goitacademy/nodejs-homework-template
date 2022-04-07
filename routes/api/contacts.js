const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require('../../controllers/contacts');
const {
  validateAuth,
  validateBody,
  validateParams,
  controlWrapper,
} = require('../../middlewares');
const {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact,
  validationContactId,
} = require('../../service/validation');

const router = new express.Router();

router
  .get('/', validateAuth, controlWrapper(getContacts))
  .post(
    '/',
    [validateAuth, validateBody(validationCreateContact)],
    controlWrapper(addContact),
  );

router
  .get(
    '/:contactId',
    [validateAuth, validateParams(validationContactId)],
    controlWrapper(getContactById),
  )
  .put(
    '/:contactId',
    [
      validateAuth,
      validateBody(validationUpdateContact),
      validateParams(validationContactId),
    ],
    controlWrapper(updateContact),
  )
  .delete(
    '/:contactId',
    [validateAuth, validateParams(validationContactId)],
    controlWrapper(removeContact),
  );

router.patch(
  '/:contactId/favorite',
  [
    validateAuth,
    validateBody(validationFavoriteContact),
    validateParams(validationContactId),
  ],
  controlWrapper(updateFavorite),
);

module.exports = router;
