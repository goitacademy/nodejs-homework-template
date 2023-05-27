const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require("../controllers/contactsControllers");
const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.patch("/:contactId", updateContact);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = { contactsRouter: router };
