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

router.put('/:contactId', authenticate, updateContactById)

router.patch('/:contactId/favorite', authenticate, updateStatusContact)

router.delete('/:contactId', authenticate, deleteContactById)

module.exports = router
