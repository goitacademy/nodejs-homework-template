const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controller/contacts");

router.get("/", controllerContacts.allContacts);

router.get("/:contactId", controllerContacts.getById);

router.get("/search", controllerContacts.serchInContacts);

router.post("/", controllerContacts.addContact);

router.delete("/:contactId", controllerContacts.removeContact);

router.put("/:contactId", controllerContacts.updateContact);

module.exports = router;
