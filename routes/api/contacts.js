const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/books');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contacts');

router.get('/', ctrl.getContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schema), ctrl.addContact);

router.put('/:id', validateBody(schema), ctrl.updateContact);

router.delete('/:id', ctrl.deleteContact);

module.exports = router;
