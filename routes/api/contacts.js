const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const validateMiddleware = validation(contactSchema);

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getById));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));
router.delete('/:contactId', validateMiddleware, ctrlWrapper(ctrl.deleteById));
router.put('/:contactId', ctrlWrapper(ctrl.updateById));

module.exports = router;
