const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts")
 // Валидатор написать
// 1
router.get('/', listContacts)
// 2
router.get('/:Id', getContactById)
// 3
router.post('/', removeContact)
// 4
router.delete('/:Id', addContact)
// 5
router.put('/:Id', updateContact)

module.exports = router
