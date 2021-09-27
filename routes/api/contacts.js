const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
  postContact,
} = require('../../controllers/contacts')

const { addContactValidation, patchContactValidation } = require('../../middlewares/validationMiddleware')

router.get('/', getContacts)
router.get('/:contactId', getContactById)
router.post('/', addContactValidation, postContact)
router.delete('/:contactId', deleteContact)
router.patch('/:contactId', patchContactValidation, updateContact)

module.exports = router
