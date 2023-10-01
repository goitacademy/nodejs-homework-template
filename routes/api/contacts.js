const express = require('express');
const router = express.Router();
const validateBody = require('../../middlewares')
const schemas = require('../../schemas/schemas');

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schemas.schemaAdd), ctrl.addContact);

router.put('/:contactId', validateBody(schemas.schemaAdd), ctrl.updateContact);

router.delete('/:contactId', ctrl.deleteContacts);

module.exports = router;
