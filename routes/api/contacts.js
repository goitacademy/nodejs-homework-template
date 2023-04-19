const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas");

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", validateBody(addSchema), ctrlContacts.addContact);

router.delete("/:contactId", ctrlContacts.deleteContact);

router.put("/:contactId", validateBody(addSchema), ctrlContacts.updateContact);

module.exports = router;
