const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/index');
const { validateBody, validateData, ctrlWrapper} = require('../../helpers/index');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateData, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateData, validateBody, ctrlWrapper(ctrl.updateById));

module.exports = router;
