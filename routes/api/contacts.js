const express = require("express");
const router = express.Router();

const validateData = require("./validation");
const {
  fetchListContacts,
  fetchContact,
  addContact,
  deleteContact,
  changeContact,
} = require("./api");

router.get("/", fetchListContacts);

router.get("/:contactId", fetchContact);

router.post("/", validateData, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateData, changeContact);

module.exports = router;
