const express = require('express');
const { asyncMiddlewareWrapper } = require('@root/helpers');
const { validateBody } = require('@root/middlewares');
const { joiSchemas } = require('@root/models/contacts');
const validateID = require('@root/middlewares/validateID');
const contactsActions = require('@root/controllers');

const router = express.Router();

router.get('/', asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  '/:contactId',
  validateID,
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post(
  '/',
  validateBody(joiSchemas.addSchema, 'missing required object field'),
  asyncMiddlewareWrapper(contactsActions.addContact)
);

router.put(
  '/:contactId',
  validateID,
  validateBody(joiSchemas.updateSchema),
  asyncMiddlewareWrapper(contactsActions.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateID,
  validateBody(
    joiSchemas.updateFavoriteField,
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
