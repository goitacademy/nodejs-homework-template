const express = require('express')
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../Controlers')

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)

router.put('/:contactId', updateContact)

router.delete('/:contactId', removeContact)

module.exports = router
