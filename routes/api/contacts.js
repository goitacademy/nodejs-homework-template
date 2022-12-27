const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');

const validateMiddleware = validation(contactSchema);

const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router
