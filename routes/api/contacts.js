const express = require("express");

const contactsController = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.addContact);

router.put("/:contactId", contactsController.updateById);

router.delete("/:contactId", contactsController.removeById);

module.exports = router;
