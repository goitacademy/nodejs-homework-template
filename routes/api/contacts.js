const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts-controllers")

const {validateBody} = require("../../utils")

const schema = require("../../schema/contacts")

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateBody(schema.contactsAddSchema), contactsController.addContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", validateBody(schema.contactsPutSchema), contactsController.updateContact);

module.exports = router;
