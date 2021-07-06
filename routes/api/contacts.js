const express = require('express')
const controllerContacts = require('../../controllers/contacts')
const router = express.Router()

const {
  validateCreateContact,
  validateUpdateContact
} = require('../../validation/validation')
const guard = require('../../helpers/guard')

router
  .get('/', guard, controllerContacts.getAll)
  .get('/:contactId', guard, controllerContacts.getById)
  .post('/', guard, validateCreateContact, controllerContacts.create)
  .put('/:contactId', guard, validateUpdateContact, controllerContacts.update)
  .delete('/:contactId', guard, controllerContacts.remove)

module.exports = router
