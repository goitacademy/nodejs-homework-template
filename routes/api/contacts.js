const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
  postContact,
} = require('../../controllers')

router.get('/', getContacts)
router.get('/:contactId', getContactById)
router.post('/', postContact)
router.delete('/:contactId', deleteContact)
router.patch('/:contactId', updateContact)

module.exports = router
