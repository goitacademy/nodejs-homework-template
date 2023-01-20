const express = require('express');

const {ctrlWrapper} = require("../../middlewares");
const {contacts: ctrl} = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.addNew));

router.put('/:id', ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updataFavorite));

router.delete('/:id', ctrlWrapper(ctrl.removeById))

module.exports = router;