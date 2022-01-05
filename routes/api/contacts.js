const express = require('express')
const router = express.Router()
const {
  getAll,
  getContactById,
  createContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
} = require('../../controllers/contactController')

router.get('/', getAll)

router.get('/:contactId', getContactById)

router.post('/', createContact)

router.put('/:contactId', updateContactById)

router.patch('/:contactId/favorite', updateStatusContact)

router.delete('/:contactId', deleteContactById)

module.exports = router