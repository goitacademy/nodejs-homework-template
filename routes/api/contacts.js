const express = require('express');
const router = express.Router()
const ctrl = require('../../controllers/contacts');
const schemas = require('../../schemas/contacts');
const { validateBody } = require('../../middlewars');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
