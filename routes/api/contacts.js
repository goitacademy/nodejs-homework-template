const express = require("express");
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contactsSchema");
const { validateBody } = require("../../middelware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schemaValidation), ctrl.add);

router.put(
  "/:contactId",
  validateBody(schemas.schemaValidation),
  ctrl.updateById
);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
