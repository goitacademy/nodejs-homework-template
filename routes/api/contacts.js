const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares/');
const { contactSchema, putSchema } = require('../../schemas');
const {contacts: ctrl} = require('../../controllers');

const ValidateMiddleware = validation(contactSchema,putSchema);

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', ValidateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeById))

router.put('/:id', ValidateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router;
