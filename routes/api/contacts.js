const express = require('express');

const router = express.Router();

const controllers = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

router.get('/', controllers.listContacts);

router.get('/:contactId', controllers.getContactById);

router.post(
  '/',
  validateBody(schemas.addContactSchema),
  controllers.addContact
);

router.delete('/:contactId', controllers.removeContact);

router.put(
  '/:contactId',
  validateBody(schemas.updateContactSchema),
  controllers.updateContact
);

module.exports = router;
