const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const asyncHandler = require('express-async-handler')
const {
  getContacts,
  getContactsById,
  createContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require('./contacts.controller.js')

router.get('/', asyncHandler(getContacts))

router.get('/:contactId', asyncHandler(getContactsById))

router.post(
  '/',
  body('phone').isLength({ min: 1 }).isMobilePhone(),
  body('email').isEmail(),
  asyncHandler(createContact)
)

router.delete('/:contactId', asyncHandler(deleteContactById))

router.patch(
  '/:contactId',
  body('phone').isLength({ min: 1 }).isMobilePhone().optional(),
  body('email').isEmail().optional(),
  asyncHandler(updateContactById)
)

router.patch(
  '/:contactId/favorite',
  body('favorite').isBoolean().withMessage('missing field favorite'),
  asyncHandler(updateStatusContact)
)

module.exports = router
