const express = require('express');
const { contactsOperation: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../schema');

const validateMiddleware = validation(contactsSchema);

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateMiddleware, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateMiddleware, ctrl.updateContact);

module.exports = router;
