const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts"); 
const {auth} = require("../../middlewares");
const {ctrlWrapper} = require("../../helpers");

router.get('/', auth, ctrlWrapper(ctrl.getListContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavorite));

module.exports = router
