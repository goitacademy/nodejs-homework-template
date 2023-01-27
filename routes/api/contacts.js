const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts/index");
const addSchemas = require("../../schemas/schemas");
const addSchemasOpt = require("../../schemas/schemasOpt");
const { controlerWrapper } = require("../../helpers/index");
const { validBody } = require("../../middleware/index");

router.get("/", controlerWrapper(controllers.listContacts));

router.get("/:contactId", controlerWrapper(controllers.getContactById));

router.post(
  "/",
  validBody(addSchemas.shcemas),
  controlerWrapper(controllers.addContact)
);

router.put(
  "/:contactId",
  validBody(addSchemasOpt.shcemasOpt),
  controlerWrapper(controllers.updateContact)
);

router.delete("/:contactId", controlerWrapper(controllers.removeContact));

module.exports = router;
