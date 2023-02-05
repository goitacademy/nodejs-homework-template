const express = require("express");
const router = express.Router();
const { addValidation } = require("../../validation.js");
const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlUpdateStatusContact,
} = require("../../controllers/contactsCtrl");

router.get("/", ctrlGetContacts);

router.get("/:contactId", ctrlGetContactById);

router.post("/", addValidation, ctrlAddContact);

router.delete("/:contactId", ctrlRemoveContact);

router.put("/:contactId", addValidation, ctrlUpdateContact);

router.patch("/:contactId/favorite", ctrlUpdateStatusContact);

module.exports = router;
