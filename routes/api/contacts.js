const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const schemas = require('../../schemas/contactsSchemas');

const { validateBody } = require('../../decorators');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete('/:id', contactsController.removeContactById);

router.put('/:id', validateBody(schemas.contactAddSchema), contactsController.updateContactById);

module.exports = router
