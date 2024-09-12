const express = require('express');

const router = express.Router();

const contactsController = require("../../controllers/contacts-controller");

const schema = require('../../schemas/contacts-schema');

const validateBody = require('../../decorators/validateBody');

router.get('/', contactsController.listContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', validateBody(schema.contactAddSchema), contactsController.addContact);

router.put('/:id', validateBody(schema.contactAddSchema), contactsController.updateContact);

router.delete('/:id', contactsController.removeContact);

module.exports = router;
