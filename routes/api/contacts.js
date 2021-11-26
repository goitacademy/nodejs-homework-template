const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(contactsSchema.schemaCreateContact), ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validation(contactsSchema.schemaUpdateContact), ctrl.updateById);

module.exports = router;
