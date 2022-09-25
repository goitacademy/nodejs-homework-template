const express = require('express');

const { contacts: ctrl } = require('../../controllers');
// validation

const { validation, ctrlWrapper } = require('../../middleWares');
const { contactsSchema } = require('../../schema');
const validateMiddleware = validation(contactsSchema);
//

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

module.exports = router;
