const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(contactsSchema.schemaCreateContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validation(contactsSchema.schemaUpdateContact), ctrlWrapper(ctrl.updateById));

module.exports = router;
