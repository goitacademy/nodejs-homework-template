const express = require("express");

const {contactsCtrl} = require("../../controllers");
const {contactSchemas} = require("../../schemas");
const {validateBody} = require("../../decorators");

const router = express.Router();

router.get("/", contactsCtrl.getAllContacts);

router.get("/:contactId", contactsCtrl.getContact);

router.post("/", validateBody(contactSchemas.addSchema), contactsCtrl.addContact);

router.put("/:contactId", validateBody(contactSchemas.addSchema), contactsCtrl.updateContact);

router.delete("/:contactId", contactsCtrl.deleteContact);

module.exports = {router};
