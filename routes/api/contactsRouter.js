const express = require("express");
const ctrlContacts = require("../../controller/contactsController");
const router = express.Router();

router.get("/", ctrlContacts.getAll);
router.get("/:contactId", ctrlContacts.getById);
router.post("/", ctrlContacts.add);
router.delete("/:contactId", ctrlContacts.deleted);
router.put("/:contactId", ctrlContacts.updateAllFields);
router.patch("/:contactId/favorite", ctrlContacts.updateFields);
module.exports = router;
