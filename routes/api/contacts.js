const controller = require('../../controllers/contacts');
console.log(controller)
const express = require('express');


const router = express.Router()

router.get('/', controller.getAllContacts);

router.get('/:contactId', controller.getContactsById);

router.post('/', controller.addNewContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', controller.updateContact);

router.patch('/:contactId/favorite', controller.updateStatusContact);

module.exports = router
