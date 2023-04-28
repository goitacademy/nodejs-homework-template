const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schema.adding), ctrl.addContact);

router.put('/:id', validateBody(schema.updating), ctrl.updateContact);

router.delete('/:id', ctrl.removeContact);

module.exports = router;
