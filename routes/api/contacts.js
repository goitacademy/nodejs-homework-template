const express = require('express');
const { contactsController } = require('../../controllers');
const validation = require('../../middlewares');
const contactsSchema = require('../../schemas');

const router = express.Router();

router.get('/', contactsController.getContactsList);

router.get('/:contactId', contactsController.getContactById);

router.post('/', validation(contactsSchema), contactsController.postAddContacts);

router.delete('/:contactId', contactsController.removeContactsById);

router.put('/:contactId', validation(contactsSchema), contactsController.updateContactsById);

module.exports = router;
