const express = require('express');
const router = express.Router();

const contactsController = require('../../controllers/contact-controllers');

const schemas = require('../../schemas/contact-schemas');
const validateBody = require('../../decorators/validateBody');

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put(
  '/:contactId',
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.delete('/:contactId', contactsController.deleteContactById);

module.exports = router;
