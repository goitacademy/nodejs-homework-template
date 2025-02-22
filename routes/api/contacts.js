const express = require("express");
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contacts");
const { validateBody, isValidId } = require("../../middelware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.schemaValidation), ctrl.add);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.schemaValidation),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
