const express = require('express')
const router = express.Router()
const {contacts: ctrl} = require('../../controllers/')
const {validation, ctrlWrapper} = require('../../midllewares/')
const {contactSchema} = require ('../../schema')


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById) )

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put("/:contactId", validation(contactSchema), ctrlWrapper(ctrl.updateContact))



module.exports = router
