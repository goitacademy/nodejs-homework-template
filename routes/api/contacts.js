const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewars');
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContactById));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

module.exports = router
