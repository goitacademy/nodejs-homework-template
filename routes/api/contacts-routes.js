const express = require("express");

const router = express.Router();

const contactsControllers = require("../../controllers/contact-controllers")

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.delete("/:id", contactsControllers.deleteContact);

router.put("/:id", contactsControllers.updateContact);

module.exports = router;
