const express = require("express");
const { contacts } = require("../../controllers");
const router = express.Router();
const validateSchema = require("../../validation");
const { joiSchema, favoriteStatusSchema } = require("../../models");

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", validateSchema(joiSchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put("/:contactId", validateSchema(joiSchema), contacts.updateContact);

router.patch(
  "/:contactId/favorite",
  validateSchema(favoriteStatusSchema),
  contacts.updateStatusContact
);

module.exports = router;
