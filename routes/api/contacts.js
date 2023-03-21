const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.changeContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
