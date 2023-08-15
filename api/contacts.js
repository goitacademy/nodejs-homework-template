// api/contacts.js
const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/', controller.getAllContacts);
router.get('/:contactId', controller.getContactById);
router.post('/', controller.createContact);
router.put('/:contactId', controller.updateContact);
router.delete('/:contactId', controller.deleteContact);
router.patch('/:contactId/favorite', controller.updateStatusContact);

module.exports = router;

