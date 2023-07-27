const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middleware/validateBody');
const { addSchematic } = require('../../schematics/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getById);

router.delete('/:contactId', ctrl.removeContact);

router.post('/', validateBody(addSchematic), ctrl.addContact);

router.put('/:contactId', validateBody(addSchematic), ctrl.updateContact);

module.exports = router;
