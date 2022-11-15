const express = require("express");
const router = express.Router();
const controller = require("../../controller");
const {wrapper} = require("../../helpers/tryCatch");
const {validatorBody} = require("../../midlieware/validBody");
const {schemaPost, schemaPut, schemaPatch} = require("../../schema/validation");
router.get("/", wrapper(controller.getAllContact));
router.post("/", validatorBody(schemaPost), wrapper(controller.addContact));
router.get("/:contactId", wrapper(controller.getContactById));
router.delete("/:contactId", wrapper(controller.removeContact));
router.put(
  "/:contactId",
  validatorBody(schemaPut),
  wrapper(controller.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validatorBody(schemaPatch),
  wrapper(controller.updateContact)
);

module.exports = router;
