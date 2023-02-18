const express = require('express');
const router = express.Router();
const schemaValidator = require('../../middlewares/SchemaValidator');
const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', schemaValidator, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', schemaValidator, ctrl.updateContact);
module.exports = router;
