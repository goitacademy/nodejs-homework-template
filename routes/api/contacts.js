const express = require("express");

const { isValidId, authenticate } = require("../../middleVares");

const contacts = require("../../models/contacts.js");

const router = express.Router();

router.get("/", authenticate, contacts.listContacts);

router.get("/:id", authenticate, isValidId, contacts.getContactById);

router.post("/", authenticate, contacts.addContact);

router.put("/:id", authenticate, isValidId, contacts.updateContact);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  contacts.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, contacts.removeContact);

module.exports = router;
