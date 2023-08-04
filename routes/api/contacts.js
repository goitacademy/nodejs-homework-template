const express = require("express");

const { validateBody, isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
