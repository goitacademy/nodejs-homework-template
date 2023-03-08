const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/contacts");

const { isValidId, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.changeContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
