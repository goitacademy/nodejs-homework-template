const express = require("express");

const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
