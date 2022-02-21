const express = require('express')

const router = express.Router()

const { validate } = require('../../middlewares/validation')
const {
  createContactScheme,
  updateContactScheme,
} = require('./contactsValidationSchemes')

const {
  getContacts,
  getContactById,
  addContact,
  updateContactPut,
  updateContactPatch,
  deleteContact,
} = require('../../controllers/contacts')

router
  .get('/', getContacts)
  .post('/', validate(createContactScheme), addContact)

router
  .get('/:contactId', getContactById)
  .put('/:contactId', validate(updateContactScheme), updateContactPut)
  .patch('/:contactId', validate(updateContactScheme), updateContactPatch)
  .delete('/:contactId', deleteContact)

module.exports = router
