const express = require('express');
const ctrl = require('../../controllers/contacts')
const router = express.Router();
const { ctrlWrapper } = require('../../helpers');


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById))

router.put('/:contactId', ctrlWrapper(ctrl.updateById));

module.exports = router
