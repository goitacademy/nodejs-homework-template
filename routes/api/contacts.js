const express = require("express")
const ctrl = require("../../controllers/contacts")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, isValidId, messages } = require("../../middlewares")
const { schemas } = require("../../models/contact")
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getContactList))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContact))

router.post('/', validateBody(schemas.addSchema, messages.addContact), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', isValidId, validateBody(schemas.addSchema, messages.updateContact), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema, messages.updateFavorite), ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact))

module.exports = router
