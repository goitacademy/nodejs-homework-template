const express = require("express");

const router = express.Router();
const { validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAllContacts);
router.get("/:id", isValidId, ctrl.getById);

router.post("/", validation(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  isValidId,
  validation(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
