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

// http://localhost:8083/api/contacts
router
  .get('/', validateAuth, controlWrapper(getContacts))
  .post(
    '/',
    [validateAuth, validateBody(validationCreateContact)],
    controlWrapper(addContact),
  );

// http://localhost:8083/api/contacts/:contactId
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

// http://localhost:8083/api/contacts/:contactId/favorite
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
