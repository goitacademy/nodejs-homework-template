const express = require('express');
const ctrl = require('../../controllers/contacts');
const {validation} = require('../../middlewares');
const {contact} = require('../../models');

const router = express.Router();
const {ctrlWrapper} = require('../../middlewares');


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(contact.joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.delById));

router.put('/:contactId', validation(contact.joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(contact.favoriteJoiSchema), ctrlWrapper(ctrl.patchFavoriteById));

module.exports = router;
