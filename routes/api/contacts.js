const express = require('express');
const router = express.Router();
const {validation, ctrlWrapper} = require('../../middlewares');
const {schemas} = require('../../models/contact')
const {contacts: ctrl} = require('../../controllers');




router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(schemas.addContactSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

router.put('/:id', validation(schemas.addContactSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
