const express = require('express');

const contactController = require("../../controllers/controllers");

const schemas = require("../../schemas/contacts-schema");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContactById);

router.post('/', validateBody(schemas.contactSchema), contactController.addContact);

router.delete('/:contactId', contactController.deleteContact);

router.put('/:contactId', validateBody(schemas.contactSchema), contactController.updateContact);

module.exports = router
