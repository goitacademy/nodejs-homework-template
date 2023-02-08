const express = require('express');
const { contactsOperation: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsSchema } = require('../../schema');

const validateMiddleware = validation(contactsSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
