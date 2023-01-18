const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactsController");

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getOne);

router.post("/", contactController.addContact);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", contactController.updateContact);

module.exports = router;
