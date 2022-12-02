const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controlers');

const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('../../schemas/schema');

const {
  contactValidation: validation,
  controlerWrapper,
} = require('../../middlewares');

router.get('/', controlerWrapper(ctrl.getAll));

router.get('/:contactId', controlerWrapper(ctrl.getById));

router.post('/', validation(contactsAddSchema), controlerWrapper(ctrl.add));

router.delete('/:contactId', controlerWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validation(contactsUpdateSchema),
  controlerWrapper(ctrl.updateById)
);

module.exports = router;
