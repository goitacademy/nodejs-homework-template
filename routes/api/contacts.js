const express = require("express");
const { schemas } = require("../../models/contact");
const { schemasUser } = require("../../models/user");
const ctrl = require("../../controllers/contacts.js");
const { isValidId, validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.putSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.patchFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
