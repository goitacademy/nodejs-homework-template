const express = require("express");

const router = express.Router();

const validateBody = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addValidateSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.addValidateSchema),
  ctrl.updateContact
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
