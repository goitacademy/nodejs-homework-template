const express = require('express');

const router = express.Router();

const controller = require('../../controllers/contactsController');

router.get('/', controller.getAllContacts);

router.get('/:contactId', controller.getContactByid);

router.post('/', controller.addNewContact);

router.delete('/:contactId', controller.deleteContactById);

router.put('/:contactId', controller.updateContactById);

module.exports = router;
