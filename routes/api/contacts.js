const express = require('express');

const ctrl = require("../../controllers/contacts")
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();


router.get('/', ctrlWrapper(ctrl.getList));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

router.put('/:id', ctrlWrapper(ctrl.updateById));


module.exports = router;
