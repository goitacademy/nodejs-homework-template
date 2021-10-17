const express = require("express");
const router = express.Router();

const { contactValidation, favoriteValidation } = require("./validation");

const {
  getListContacts,
  getContact,
  saveContact,
  deleteContact,
  changeContact,
  changeStatusContact,
} = require("../../controllers/contacts");

router.get("/", getListContacts);

router.get("/:contactId", getContact);

router.post("/", contactValidation, saveContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, changeContact);

router.patch("/:contactId/favorite", favoriteValidation, changeStatusContact);

module.exports = router;
