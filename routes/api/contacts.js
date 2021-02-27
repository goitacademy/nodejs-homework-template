const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')
const { validateAddContact, validateUpdateContact } = require('./validator')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validateAddContact, addContact)

router.delete('/:contactId', removeContact)

router.patch('/:contactId', validateUpdateContact, updateContact)

module.exports = router
