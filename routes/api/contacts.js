const express = require('express');

const router = express.Router();

const controllers = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../utils/validation/contactValidationSchemas');

router.get('/', controllers.listContacts);

router.get('/:contactId', isValidId, controllers.getContactById);

router.post(
  '/',
  validateBody(schemas.addContactSchema),
  controllers.addContact
);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.updateContactSchema),
  controllers.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  controllers.updateStatusContact
);

router.delete('/:contactId', isValidId, controllers.removeContact);

module.exports = router;
