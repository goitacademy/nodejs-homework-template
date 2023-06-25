const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../shemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema); // вызываем ф-ю влидации

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getById));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));
router.delete('/:contactId', ctrlWrapper(ctrl.removeById));
router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router;
