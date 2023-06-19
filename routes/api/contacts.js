const express = require("express");

const router = express.Router();
const { validation, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, ctrl.getAllContacts);
router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validation(schemas.addSchema), ctrl.addContact);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validation(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
