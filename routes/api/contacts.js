const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validBody, validId } = require("../../middlewares");

const { schemas } = require("../../models");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", validId, ctrl.getContactById);

router.post("/", validBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validId,
  validBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validId,
  validBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", validId, ctrl.deleteContactById);

module.exports = router;
