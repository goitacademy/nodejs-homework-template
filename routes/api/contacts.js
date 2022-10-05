const express = require("express")
const ctrl = require("../../controllers/contacts")
const { ctrlWrapper } = require("../../helpers")
const { validateBody } = require("../../middlewares")
const { contactsSchema } = require("../../schemas/contacts")
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getContactList))

router.get('/:contactId', ctrlWrapper(ctrl.getContact))

router.post('/', validateBody(contactsSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validateBody(contactsSchema), ctrlWrapper(ctrl.updateContact))

module.exports = router
