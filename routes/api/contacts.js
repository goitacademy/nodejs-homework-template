const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts"); 
const {users} = require("../../middlewares");
const {ctrlWrapper} = require("../../helpers");

router.get('/', users, ctrlWrapper(ctrl.getListContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', users, ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavorite));

module.exports = router
