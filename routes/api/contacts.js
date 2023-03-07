const express = require("express");

const ctrl = require("../../controllers/index");

const { validateBody, isValidId } = require("../../middlewares");
const { contactSchemaJoi, contactSchemaFavorite } = require("../../models");

const router = express.Router();

router.post("/", validateBody(contactSchemaJoi), ctrl.contactAdd);

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchemaJoi),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactSchemaFavorite),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

module.exports = router;
