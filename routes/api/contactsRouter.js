const express = require('express')


const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contactsControllers");
const router = express.Router()

router.route("/").get(getContacts).post(createContact);
router.route("/:contactId").get(getContact).put(updateContact).delete(deleteContact);

module.exports = {
  contactsRouter: router,
};