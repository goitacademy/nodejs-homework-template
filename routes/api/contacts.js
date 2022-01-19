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
const { authentication } = require('../../middlewares')

router.get('/', authentication, getAll)

router.get('/:contactId', authentication, getContactById)

router.post('/', authentication, createContact)

router.put('/:contactId', authentication, updateContactById)

router.patch('/:contactId/favorite', authentication, updateStatusContact)

router.delete('/:contactId', authentication, deleteContactById)

module.exports = router
