const express = require('express')

const router = express.Router()

const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
} = require("../../controllers/contacts-controllers");

router.get('/', getAllContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)

router.delete('/:contactId', updateContactById)

router.put('/:contactId', deleteContact)

module.exports = router
