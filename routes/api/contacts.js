const express = require('express');

const contactsController = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.postContact);

router.delete("/:contactId", contactsController.deleteContactById);

router.put("/:contactId", contactsController.putContactById);

module.exports = router;
