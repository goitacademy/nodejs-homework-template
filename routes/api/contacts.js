const express = require('express');
const router = express.Router();

const controller = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const contactsSchema = require('../../schema/contacts');

router.get('/', controller.getAllContacts);

router.get('/:contactId', controller.getContactById);

router.post('/', validateBody(contactsSchema), controller.addContact);

router.delete('/:contactId', validateBody(contactsSchema), controller.updateContactById);

router.put('/:contactId', controller.removeContactById);

module.exports = router
