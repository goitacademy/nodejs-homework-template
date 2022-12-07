const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts")
 
 const {
  addContactValidation,
} = require("../../middlewares/validationMidleware");

router.get('/', listContacts)

router.get('/:Id', getContactById)

router.post('/', addContactValidation, addContact)

router.delete('/:Id', removeContact)

router.put('/:Id', updateContact)

module.exports = router
