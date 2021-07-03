const express = require('express')
const router = new express.Router()

const {
  contactValidation,
} = require('../middlewares/contactValidationMiddleware')
const { asyncWrapper } = require('../helpers/apiHelpers')

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  updateStatusContactController,
  deleteContactController,
} = require('../controllers/contactsController')

router.get('/', asyncWrapper(getContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', contactValidation, asyncWrapper(addContactController))
router.patch(
  '/:contactId',
  contactValidation,
  asyncWrapper(changeContactController),
)
router.patch(
  '/:contactId/favorite',
  contactValidation,
  asyncWrapper(updateStatusContactController),
)
router.delete('/:contactId', asyncWrapper(deleteContactController))

module.exports = { contactsRouter: router }
