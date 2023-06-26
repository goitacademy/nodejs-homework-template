const express = require("express");
const schema = require("../../schema/schema");
const validationBody = require("../../middlewares/validationBody");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validationBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validationBody(schema.addSchema),
  ctrl.updateContactById
);

module.exports = router;
