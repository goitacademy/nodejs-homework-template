const express = require('express')

const router = express.Router()

const {
  postValidation,
  putValidation
} = require('../../middlewares/walidationMiddleware')

const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContactById
} = require('../../controllers/contactsController')

router.get('/', getContacts)
router.get('/:contactId', getContactsById)
router.post('/', postValidation, addContact)
router.delete('/:contactId', deleteContact)
router.put('/:contactId', putValidation, updateContactById)

module.exports = router;