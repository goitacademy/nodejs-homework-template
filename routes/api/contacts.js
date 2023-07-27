const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

module.exports = router;
