const express = require("express");
const ctrl = require("../../controllers/contacts/index");
const validateBody = require("../../middlewares/index");
const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactSchema),
  ctrl.updateContact
);

module.exports = router;
