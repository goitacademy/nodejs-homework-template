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
const { authenticate } = require('../../middlewares')

router.get('/', authenticate, getAll)

router.get('/:contactId', authenticate, getContactById)

router.post('/', authenticate, createContact)

router.put('/:contactId', updateContactById)

router.patch('/:contactId/favorite', updateStatusContact)

router.delete('/:contactId', deleteContactById)

module.exports = router
