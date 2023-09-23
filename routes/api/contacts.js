const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {
  validateBody,
  isValidId,
  validateFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models");

router.get("/", ctrl.getContacts);

router.get("/:id", isValidId, ctrl.getContactsById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
