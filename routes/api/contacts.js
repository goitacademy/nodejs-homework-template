const express = require('express');
const ctrl = require("../../controllers/contacts");
const {auth} = require('../../middlewares');
const {ctrlWrapper} = require('../../helpers');
const router = express.Router();


router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/',auth, ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', auth, ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateFavorite));

module.exports = router
