const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middelwares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post(
  "/",
  validateBody(schemas.addSchemaPost),
  ctrl.addContacts
);

router.put(
  "/:id",
  validateBody(schemas.addSchemaPut),
  ctrl.updateContacts
);
router.delete("/:id", ctrl.deleteContacts);

module.exports = router;
