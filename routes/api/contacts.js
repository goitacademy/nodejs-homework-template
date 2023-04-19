const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas");
const { updateSchema } = require("../../schemas");

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", validateBody(addSchema), ctrlContacts.addContact);

router.delete("/:contactId", ctrlContacts.deleteContact);

router.put(
  "/:contactId",
  validateBody(updateSchema),
  ctrlContacts.updateContact
);

module.exports = router;
