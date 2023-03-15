const express = require('express');

const { validation } = require('../../middleware/');
const { contactSchema } = require('../../schemas');
const { contacts: controller } = require('../../controllers');

const router = express.Router();

router.get('/', controller.getAllContacts);

router.get('/:contactId', controller.getContactById);

router.post('/', validation(contactSchema), controller.addContact);

router.put('/:contactId', validation(contactSchema), controller.updateContact);

router.delete('/:contactId', controller.deleteContact);

module.exports = router;
