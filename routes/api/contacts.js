const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares/validationMiddleware')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../сontrollers/contactsControllers");

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validation, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validation, updateContact)

module.exports = router
