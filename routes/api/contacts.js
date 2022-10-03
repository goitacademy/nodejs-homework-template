const express = require('express');
const ctrl = require('../../controllers/contacts')
const router = express.Router();
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { addSchema } = require('../../schemas/contacts');


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById))

router.put('/:contactId', validateBody(addSchema), ctrlWrapper(ctrl.updateById));

module.exports = router
