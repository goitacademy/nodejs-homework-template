const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middelwares");
const schemas = require("../../schemas/contacts");
const { isValidId } = require("../../middelwares");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchemaPost),
  ctrl.addContacts
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchemaPut),
  ctrl.updateContacts
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.addSchemaPut),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteContacts);

module.exports = router;
