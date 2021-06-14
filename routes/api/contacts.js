const express = require('express')
const router = express.Router()
const {
  getAll,
  getById,
  create,
  remove,
  update
} = require('../../controllers/contacts')
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contactsValidation')

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', validateCreateContact, create)

router.delete('/:contactId', remove)

router.put('/:contactId', validateUpdateContact, update)

router.patch('/:contactId', validateUpdateContact, update)

module.exports = router
