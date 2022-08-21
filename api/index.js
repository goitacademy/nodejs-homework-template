const express = require("express");
const router = express.Router();
const ctrlContacts = require("../controller/index.js");

router.get("/contacts", ctrlContacts.get);
router.get("/contacts/:id", ctrlContacts.getById);
router.post("/contacts", ctrlContacts.addContact);
router.delete("/contacts/:id", ctrlContacts.removeContactById);
router.put("/contacts/:id", ctrlContacts.updateContact);
router.patch("/contacts/:id/favorite", ctrlContacts.updateStatus);

module.exports = router;