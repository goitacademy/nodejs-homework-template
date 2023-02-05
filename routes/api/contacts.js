const express = require('express');
const { asyncMiddlewareWrapper } = require('@root/helpers');
const { validateBody, validateJwtToken } = require('@root/middlewares');
const {
  contactJoiSchemas: { addSchema, updateSchema, updateFavoriteField },
} = require('@root/models');
const validateID = require('@root/middlewares/validateID');
const { contactsActions } = require('@root/controllers');

const router = express.Router();

router.all('*', validateJwtToken);

router.get('/', asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  '/:contactId',
  validateID,
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post(
  '/',
  validateBody(addSchema, 'missing required object field'),
  asyncMiddlewareWrapper(contactsActions.addContact)
);

router.put(
  '/:contactId',
  validateID,
  validateBody(updateSchema),
  asyncMiddlewareWrapper(contactsActions.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateID,
  validateBody(
    updateFavoriteField,
    'missing field in request`s object: "favorite"'
  ),
  asyncMiddlewareWrapper(contactsActions.updateStatus)
);

router.delete(
  '/:contactId',
  validateID,
  asyncMiddlewareWrapper(contactsActions.deleteContactByID)
);

module.exports = router;
