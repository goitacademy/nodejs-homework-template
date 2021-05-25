const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../../validation/validate-contacts')

router.get('/', guard, controller.getAllContacts)

router.get('/:contactId', guard, controller.getById)

router.post('/', guard, validateCreateContact, controller.addNewContact)

router.delete('/:contactId', guard, controller.removeSomeContact)

router.patch(
  '/:contactId',
  guard,
  validateUpdateContact,
  controller.updateSomeContact
)

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateStatus,
  controller.updateStatus
)

module.exports = router
