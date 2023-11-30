const express = require("express");
const contacts = require("../../controllers/contacts");
const { validation } = require("../../middlewares");
const { bodySchema } = require("../../schemas");

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", validation(bodySchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put("/:contactId", validation(bodySchema), contacts.updateContact);

module.exports = router;