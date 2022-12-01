const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controlers');

const {
  contactsAddSchema: schemaAdd,
  contactsUpdateSchema: schemaUpdate,
} = require('../../schemas');
const {
  contactValidation: validation,
  controlerWrapper,
} = require('../../middlewares');

router.get('/', controlerWrapper(ctrl.getAll));

router.get('/:contactId', controlerWrapper(ctrl.getById));

router.post('/', validation(schemaAdd), controlerWrapper(ctrl.add));

router.delete('/:contactId', controlerWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validation(schemaUpdate),
  controlerWrapper(ctrl.updateById)
);

module.exports = router;
