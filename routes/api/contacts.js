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
const {authenticateUser} = require('../../middleware/authenticateUser')

router.get('/', authenticateUser, errorHandler(listContactsController))

router.get('/:contactId', authenticateUser,errorHandler(getContactByIdController))

router.post('/', authenticateUser, addContactValidation, errorHandler(addContactController))

router.delete('/:contactId', authenticateUser, errorHandler(removeContactController))

router.put('/:contactId', authenticateUser, updateContactValidation, errorHandler(updateContactController))

router.patch('/:contactId/favorite', authenticateUser, patchContactValidation, errorHandler(updateStatusContactController))

module.exports = router
