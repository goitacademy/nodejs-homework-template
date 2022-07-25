const express = require('express');

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
