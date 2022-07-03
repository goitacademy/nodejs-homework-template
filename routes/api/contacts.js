const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { ctrlWrapper } = require('../../helpers')
const { validation, isValidId, authenticate } = require('../../middlewares')
const { schemas } = require('../../models/contact')

router.get('/', authenticate, ctrlWrapper(ctrl.getContacts))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById))

router.post(
  '/',
  authenticate,
  validation(schemas.contactAddSchema),
  ctrlWrapper(ctrl.addContact),
)

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact))

router.put(
  '/:contactId',
  isValidId,
  validation(schemas.contactUpdSchema),
  ctrlWrapper(ctrl.updateContact),
)

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(schemas.updateStatusContact),
  ctrlWrapper(ctrl.updateStatusContact),
)

module.exports = router
