const express = require('express');
const contacts = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', contacts.listContacts);

router.get('/:contactId', contacts.getContactById);

router.post('/', validateBody(schemas.contactsAddSchema), contacts.addContact);

router.delete('/:contactId', contacts.removeContact);

router.put('/:contactId', validateBody(schemas.contactsAddSchema), contacts.updateContact);

module.exports = router;
