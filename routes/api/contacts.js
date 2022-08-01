const express = require('express');

const ctrl = require("../../controllers/contacts");

const {auth} = require("../../middlewares");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', auth, ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', auth, ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
