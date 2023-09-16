const express = require('express');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const controllers = require('../../controllers/contacts');
const schemas = require('../../utils/validation/contactValidationSchemas');

const router = express.Router();

router.get('/', authenticate, controllers.listContacts);

router.get('/:contactId', authenticate, isValidId, controllers.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addContactSchema),
  controllers.addContact
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  controllers.updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  controllers.updateStatusContact
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllers.removeContact
);

module.exports = router;
