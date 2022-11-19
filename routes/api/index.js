const express = require("express");
const {schemaPost, schemaPut, schemaPatch} = require("../../schema/validation");
const controller = require("../../controller");
const {validatorBody} = require("../../middleWare/validBody");
const {wrapper} = require("../../helpers/tryCatch");
const {check} = require("../../middleWare/auth");

const router = express.Router();

router.use(check);

router.get("/", wrapper(controller.getAllContact));

router.get("/:contactId", wrapper(controller.getContactById));

router.post("/", validatorBody(schemaPost), wrapper(controller.addContact));

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
