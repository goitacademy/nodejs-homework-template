const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controlers');

const { contactsSchema: schema } = require('../../schemas');
const {
  contactValidation: validation,
  controlerWrapper,
} = require('../../middlewares');

router.get('/', controlerWrapper(ctrl.getAll));

router.get('/:contactId', controlerWrapper(ctrl.getById));

router.post('/', validation(schema), controlerWrapper(ctrl.add));

router.delete('/:contactId', controlerWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validation(schema),
  controlerWrapper(ctrl.updateById)
);

module.exports = router;
