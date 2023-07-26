const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId');

router.put('/:contactId');

module.exports = router;
