/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.put("/:id", updateContact);

router.delete("/:id", removeContact);

module.exports = router;
