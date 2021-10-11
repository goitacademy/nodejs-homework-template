const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
  postContact,
  changeFavoriteContact
} = require('../../controllers/contacts')

const { addContactValidation, patchContactValidation } = require('../../middlewares/validationMiddleware')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', asyncWrapper(getContacts))
router.get('/:contactId', asyncWrapper(getContactById))
router.post('/', addContactValidation, asyncWrapper(postContact))
router.delete('/:contactId', asyncWrapper(deleteContact))
router.patch('/:contactId', patchContactValidation, asyncWrapper(updateContact))
router.patch('/:contactId/favorite', patchContactValidation, asyncWrapper(changeFavoriteContact))

module.exports = router
