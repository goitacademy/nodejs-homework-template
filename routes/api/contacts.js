const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
