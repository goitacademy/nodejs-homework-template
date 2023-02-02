const express = require('express');

const ctrl = require('../../controllers/');
const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', ctrl.updateContact);

module.exports = router;
