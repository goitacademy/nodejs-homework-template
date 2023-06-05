const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validation } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validation(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.deleteContactByID);

router.put('/:contactId', validation(schemas.addSchema), ctrl.updateContact);

module.exports = router;
