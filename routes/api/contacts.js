const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
