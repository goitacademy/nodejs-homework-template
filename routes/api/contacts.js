const express = require('express');
const { asyncMiddlewareWrapper } = require('@root/helpers');
const { validateBody } = require('@root/middlewares');
const validateID = require('@root/middlewares/validateID');
const contactsActions = require('@root/controllers');
const {
  addContactSchema,
  updateContactSchema,
} = require('@root/schemas/contacts');

const router = express.Router();

router.get('/', asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  '/:contactId',
  validateID,
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post(
  '/',
  validateBody(addContactSchema, 'missing required name field'),
  asyncMiddlewareWrapper(contactsActions.addContact)
);

router.put(
  '/:contactId',
  validateID,
  validateBody(updateContactSchema),
  asyncMiddlewareWrapper(contactsActions.updateContact)
);

router.delete(
  '/:contactId',
  validateID,
  asyncMiddlewareWrapper(contactsActions.deleteContactByID)
);

module.exports = router;
