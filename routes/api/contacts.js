const express = require('express');

const ctrl = require('../../controllers/contacts');

const validateBody = require("../../utils/validateBody");

const schemas = require("../../schemas/contacts");

const router = express.Router();


router.get('/', ctrl.getAll)

// router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schemas.addContactsSchema), ctrl.addContact);

// router.delete('/:id', ctrl.removeContact);

// router.put('/:id', validateBody(schemas.addContactsSchema), ctrl.updateContact)

module.exports = router;