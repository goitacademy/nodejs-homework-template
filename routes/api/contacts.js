const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const validateSchema = require("../../validation");
const { joiContactSchema, favoriteStatusSchema } = require("../../models");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateSchema(joiContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateSchema(joiContactSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateSchema(favoriteStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
