const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();
const { validateBodyContacts } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBodyContacts(schemas.schemaContacts), ctrl.add);

router.put(
  "/:id",
  validateBodyContacts(schemas.schemaContacts),
  ctrl.updateById
);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
