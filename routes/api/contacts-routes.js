const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();
const { validateBody } = require("../../utils");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactbyID
);

router.delete("/:contactId");

module.exports = router;
