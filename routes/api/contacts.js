const express = require('express');

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require('../../middlewares');
const { productSchema } = require('../../schema');
const router = express.Router();

const validateMiddleware = validation(productSchema);

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', validateMiddleware, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', ctrlWrapper(ctrl.updateById));

module.exports = router;
