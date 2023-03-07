const express = require("express");
const router = express.Router();
const controllerContact = require('../../controller/contactsController/index')

router.get("/", controllerContact.allContacts);

router.get("/:contactId", controllerContact.getById);

router.get("/search", controllerContact.serchInContacts);

router.post("/", controllerContact.addContact);

router.delete("/:contactId", controllerContact.removeContact);

router.put("/:contactId", controllerContact.updateContact);

router.patch("/:contactId", controllerContact.chengOfPart);

module.exports = router;
