const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middleware');
const schema = require('../../schema/contacts');

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schema.addSchema), ctrl.addContact);

router.put('/:id', validateBody(schema.addSchema), ctrl.updateContact);

router.delete('/:id', ctrl.deleteContact);

module.exports = router;
