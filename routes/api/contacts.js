const express = require('express');

const { validation, ctrlWrapper } = require('../../middleware');
const { contactsSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validationMiddleware = validation(contactsSchema);
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validationMiddleware, ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validationMiddleware, ctrlWrapper(ctrl.updateContact))

module.exports = router
