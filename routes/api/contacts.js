const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrl.getListContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', ctrl.removeContact);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
