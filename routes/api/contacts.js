const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody, existBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', existBody(), validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
