const express = require('express')

const router = express.Router()

const {
  postValidation,
  putValidation,
  patchValidation
} = require('../../middlewares/walidationMiddleware')

const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContactById,
  updateFavorite
} = require('../../controllers/contactsController')

router.get('/', getContacts)
router.get('/:contactId', getContactsById)
router.post('/', postValidation, addContact)
router.delete('/:contactId', deleteContact)
router.put('/:contactId', putValidation, updateContactById)
router.patch('/:contactId/favorite', patchValidation, updateFavorite)

module.exports = router;