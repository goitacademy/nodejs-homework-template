const express = require("express")
const ctrl = require("../../controllers")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, isValidId, errMessages } = require("../../middlewares")
const { schemas } = require("../../models/contact")
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getContactList))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContact))

router.post('/', validateBody(schemas.addSchema, errMessages.addContact), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', isValidId, validateBody(schemas.addSchema, errMessages.updateContact), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema, errMessages.updateFavorite), ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact))

module.exports = router
