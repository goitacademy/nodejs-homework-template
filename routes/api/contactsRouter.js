const express = require('express')
const router = new express.Router()

const {
  contactValidation,
  favoriteValidation,
} = require('../middlewares/validationMiddleware')

const { asyncWrapper } = require('../helpers/apiHelpers')

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require('../controllers/contactsController')

router.get('/', asyncWrapper(getContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', contactValidation, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(deleteContactController))
router.put(
  '/:contactId',
  contactValidation,
  asyncWrapper(updateContactController)
)
router.patch(
  '/:contactId/favorite',
  favoriteValidation,
  asyncWrapper(updateFavoriteController)
)

module.exports = router
