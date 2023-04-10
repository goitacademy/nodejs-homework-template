const express = require("express");
const contactsController = require("../../controllers/contacts");

const router = express.Router();

router.get("/", contactsController.getContacts);

router.get("/:id", contactsController.getContact);

router.post("/", contactsController.createContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", contactsController.updateContact);

module.exports = router;
