const express = require("express");
const router = express.Router();

const {
  getContacts,
  newContact,
  ContactById,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsControlers");

router.get('/', getContacts);

router.get('/:contactId', ContactById);

router.post('/', newContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContact);

module.exports = router;
