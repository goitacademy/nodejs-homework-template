const express = require('express');
const router = express.Router();
const {validation, ctrlWrapper} = require('../../middlewares');
const {contactSchema} = require('../../schemas')
const {contacts: ctrl} = require('../../controllers');

const validationMiddleware = validation(contactSchema);


router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validationMiddleware, ctrlWrapper(ctrl.addContact))

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

router.put('/:id', validationMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router
