const express = require('express');
const { contactsOperation: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', ctrl.updateContact);

module.exports = router;
