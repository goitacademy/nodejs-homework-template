const express = require("express");
const router = express.Router();
// const Contacts = require("../../../model");
const {
  validateContact,
  validateUpdateContact,
  validateId,
} = require("./validation");

const {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  patchContact,
  deleteContact,
} = require("../../controllers/controllersContacts");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContactById);

router.post("/", validateContact, addContact);

router.put("/:contactId", validateId, validateContact, changeContact);

router.delete("/:contactId", validateId, deleteContact);

router.patch("/:contactId", validateId, validateUpdateContact, patchContact);

module.exports = router;
