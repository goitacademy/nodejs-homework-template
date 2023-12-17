const express = require('express');

const router = express.Router();

const controler = require('../../controllers/contacts');

const { validation } = require('../../middlewares');

const schemas = require('../../validationSchema/contacts');

router.get('/', controler.getAllContacts);

router.get('/:contactId', controler.getContactById);

router.post('/', validation(schemas.addSchema), controler.addContact);

router.put(
  '/:contactId',
  validation(schemas.addSchema),
  controler.updateContact
);

router.delete('/:contactId', controler.removeContact);

module.exports = router;
