const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsSchema } = require('../../shemas');

const validateMiddleware = validation(contactsSchema);

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', validation(contactsSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
