const express = require("express");

const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

module.exports = router;
