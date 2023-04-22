const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateContact
);

router.put(
  "/:contactId",
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);

module.exports = router;
