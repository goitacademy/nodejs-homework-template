const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
  validateObjectId,
} = require('../../../validation/validate-contacts')

router.get('/', guard, controller.getAllContacts)

router.get('/:contactId', guard, controller.getById)

router.post('/', guard, validateCreateContact, controller.addNewContact)

router.delete('/:contactId', guard, validateObjectId, controller.removeSomeContact)

router.patch(
  '/:contactId',
  guard,
  validateObjectId,
  validateUpdateContact,
  controller.updateSomeContact
)

router.patch(
  '/:contactId/favorite',
  guard,
  validateObjectId,
  validateUpdateStatus,
  controller.updateStatus
)



module.exports = router


