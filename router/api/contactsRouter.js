const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const express = require('express')
const router = express.Router()
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsController')
const {
  validationMiddleware,
  validateFavoriteStatus,
} = require('../../middlewares/validationMiddleware')
// Всі контакти
router.get('/', asyncWrapper(listContacts))
// вибір контакту по ІД
router.get('/:contactId', asyncWrapper(getContactById))
// Додати контакт
router.post('/', validationMiddleware, asyncWrapper(addContact))
// Видалення контакту
router.delete('/:contactId', asyncWrapper(removeContact))
// Змінити контакт
router.put('/:contactId', validationMiddleware, asyncWrapper(updateContact))
// Route for changing status
router.patch(
  '/:contactId/favorite',
  validateFavoriteStatus,
  asyncWrapper(updateStatusContact),
)

module.exports = router
