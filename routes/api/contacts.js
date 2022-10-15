const express = require('express');
const router = express.Router();
const {validation, ctrlWrapper, authenticate} = require('../../middlewares');
const {schemas} = require('../../models/contact')
const {contacts: ctrl} = require('../../controllers');




router.get('/', authenticate, ctrlWrapper(ctrl.getAllContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(schemas.addContactSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:id', authenticate, ctrlWrapper(ctrl.removeContact))

router.put('/:id', authenticate, validation(schemas.addContactSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', authenticate, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
