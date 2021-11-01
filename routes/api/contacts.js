const express = require('express')
const router = express.Router()

const {
  addContactController,
  getContactByIdController,
  listContactsController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contacts')

const {
  addContactValidation,
  updateContactValidation,
} = require('../../validation/validation')

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', addContactValidation, addContactController)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', updateContactValidation, updateContactController)

module.exports = router
