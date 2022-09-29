const express = require('express');
const router = express.Router();
const {validation, ctrlWrapper} = require('../../middlewares');
const {contactSchema} = require('../../schemas')
const {contacts: ctrl} = require('../../controllers');




router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

router.put('/:id', validation(contactSchema), ctrlWrapper(ctrl.updateContact));

module.exports = router
