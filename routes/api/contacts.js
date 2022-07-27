const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");
const { auth } = require("../../middlewares");

router.get("/", auth, contacts.getAll);

router.get("/:contactId", contacts.getContactById);

router.post("/", auth, contacts.addContact);

router.put("/:contactId", contacts.updateContact);

router.patch("/:id/favorite", contacts.updateStatusContact);

router.delete("/:contactId", contacts.removeContact);

module.exports = router;
