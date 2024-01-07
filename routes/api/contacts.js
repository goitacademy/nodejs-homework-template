const express = require("express");
const router = express.Router();
const ctrl = require("../../controlers/contacts");

const { validateBody, isEmptyBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put(
  "/:id",
  isEmptyBody,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

module.exports = router;
