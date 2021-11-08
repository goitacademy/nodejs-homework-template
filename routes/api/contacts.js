const express = require('express')
const router = express.Router()

const {
  addContactController,
  getContactByIdController,
  listContactsController,
  removeContactController,
  updateContactController,
  updateStatusContactController
} = require('../../controllers/contacts')

const {
  addContactValidation,
  updateContactValidation,
  patchContactValidation
} = require('../../middleware/validation')
const { errorHandler } = require('../../helpers/errorHandler')

router.get('/', errorHandler(listContactsController))

router.get('/:contactId', errorHandler(getContactByIdController))

router.post('/', addContactValidation, errorHandler(addContactController))

router.delete('/:contactId', errorHandler(removeContactController))

router.put('/:contactId', updateContactValidation, errorHandler(updateContactController))

router.patch('/:contactId/favorite', patchContactValidation, errorHandler(updateStatusContactController))

module.exports = router
