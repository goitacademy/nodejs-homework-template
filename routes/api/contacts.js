const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const {
  validateBody,
  validateUpdateBody,
  validateUpdateBodyFavorite,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  isValidId,
  validateUpdateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateUpdateBodyFavorite(schemas.updateFavoriteSchemas),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
