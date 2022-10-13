const express = require("express")
const {contactsCtrl} = require("../../controllers")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, isValidId, errMessages, authenticate } = require("../../middlewares")
const { contactSchemas } = require("../../models")
const router = express.Router()

router.get('/',
  authenticate,
  ctrlWrapper(contactsCtrl.getContactList)
)

router.get('/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(contactsCtrl.getContact)
)

router.post('/',
  authenticate,
  validateBody(contactSchemas.addSchema, errMessages.addContact),
  ctrlWrapper(contactsCtrl.addContact)
)

router.put('/:contactId',
  authenticate,
  isValidId,
  validateBody(contactSchemas.addSchema, errMessages.updateContact),
  ctrlWrapper(contactsCtrl.updateContact)
)

router.patch('/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema, errMessages.updateFavorite),
  ctrlWrapper(contactsCtrl.updateStatusContact)
)

router.delete('/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(contactsCtrl.removeContact)
)

module.exports = router
