const express = require("express");
const validateData = require("../../middlewares/validateData");

const {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controlers/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateData, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateData, updateContact);

module.exports = router;
