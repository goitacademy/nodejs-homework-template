const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", listContacts); 

router.get('/:contactId', getContactById);

router.post("/", addContact);

router.delete('/:contactId', removeContact); 

router.put('/:contactId', updateContact); 

module.exports = { contactsRouter: router };
