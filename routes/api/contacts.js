const express = require("express");
const contacts = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { bodySchema } = require("../../schemas");

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", validateBody(bodySchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put("/:contactId", validateBody(bodySchema), contacts.updateContact);

module.exports = router;