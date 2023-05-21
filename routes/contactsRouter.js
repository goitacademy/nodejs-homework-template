const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsControllers");
const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", createContact);

router.patch("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = { contactsRouter: router };
