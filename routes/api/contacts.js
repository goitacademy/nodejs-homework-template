const express = require('express')
const router = express.Router()
const {
  getAll,
  getContactById,
  createContact,
  updateContactById,
  updateStatusById,
  deleteContactById,
} = require('../../controllers/contactController')

router.get('/', getAll)

router.get('/:contactId', getContactById)

router.post('/', createContact)

router.put('/:contactId', updateContactById)

router.patch('/:contactId/favorite', updateStatusById)

router.delete('/:contactId', deleteContactById)

module.exports = router
