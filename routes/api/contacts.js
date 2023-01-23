const express = require('express');

const {auth, ctrlWrapper} = require("../../middlewares");
const {contacts: ctrl} = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', auth,  ctrlWrapper(ctrl.addNew));

router.put('/:id', ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updataFavorite));

router.delete('/:id', ctrlWrapper(ctrl.removeById))

module.exports = router;