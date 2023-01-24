const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");

const {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
} = controllers;

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
