const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchemaAdd, joiSchemaUpdate } = require('../../models/contact');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(joiSchemaAdd), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validation(joiSchemaUpdate), ctrlWrapper(ctrl.updateById));

module.exports = router;
