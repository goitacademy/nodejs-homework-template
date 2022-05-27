const express = require('express');

const {validation,ctrlWrapper} =require("../../middlewares");
const {contactSchema}=require("../../schemas")
const {contacts:ctrl}=require("../../controllers/");


const validateMiddleware =validation(contactSchema);
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAllContacts) )

router.get('/:contactId',ctrlWrapper(ctrl.getContactById))

router.post('/',validateMiddleware,ctrlWrapper(ctrl.addContact) )

router.delete('/:contactId',ctrlWrapper(ctrl.removeContact ))

router.put('/:contactId',validateMiddleware, ctrlWrapper(ctrl.updateContactById))

module.exports = router
