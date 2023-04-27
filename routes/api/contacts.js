const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controller/contacts");

router.get("/", ctrlContacts.get);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", ctrlContacts.create);

router.delete("/:contactId", ctrlContacts.remove);

router.put("/:contactId", ctrlContacts.update);

router.patch("/:contactId/favorite", ctrlContacts.updateStatus);
module.exports = router;
