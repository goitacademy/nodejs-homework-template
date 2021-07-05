const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model");

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.patch('/:contactId', updateContact)

module.exports = router
