const express = require('express');

const contactController = require('../../controllers/contacts-controllers');
const { validateBody } = require('../../decoraters/validateBody');
const schema = require('../../schemas/contact-schemes');

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:contactId', contactController.getContactById);

router.post(
  '/',
  validateBody(schema.addContactSchema),
  contactController.addNewContact
);

router.delete('/:contactId', contactController.deleteContact);

router.put(
  '/:contactId',
  validateBody(schema.addContactSchema),
  contactController.updateContact
);

module.exports = router;
