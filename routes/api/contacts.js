const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { validationContact, validationFavorite } = require("../../models");

router.get("", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("", validateBody(validationContact), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(validationContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(validationFavorite),
  ctrl.updateStatusContact
);

module.exports = router;
