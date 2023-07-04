const express = require('express');

const router = express.Router();

const contactsControllers = require('../../controllers/contacts');

const { isValidID, authenticate } = require('../../middlewares');

const { validateBody } = require('../../dec');

const { contactAddSchema, contactUpdateFavoriteSchema } = require('../../schemas');

router.use(authenticate);

router.get('/', contactsControllers.getAllContacts);

router.get('/:contactId', isValidID, contactsControllers.getContactID);

router.post('/', validateBody(contactAddSchema), contactsControllers.addContact);

router.delete('/:contactId', isValidID, contactsControllers.deleteContactID);

router.put(
  '/:contactId',
  isValidID,
  validateBody(contactAddSchema),
  contactsControllers.updateContactID
);

router.patch(
  '/:contactId/favorite',
  isValidID,
  validateBody(contactUpdateFavoriteSchema),
  contactsControllers.updateStatusContact
);

module.exports = router;
