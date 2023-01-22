const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts/index");
const addSchemas = require("../../schemas/schemas");
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
  validBody(addSchemas.shcemas),
  controlerWrapper(controllers.updateContact)
);

router.delete("/:contactId", controlerWrapper(controllers.removeContact));

module.exports = router;
