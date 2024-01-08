const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post(
  "/",
  validateBody(schema.addSchema, "missing required name field"),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schema.addSchema, "missing fields"),
  ctrl.updateContact
);

module.exports = router;
