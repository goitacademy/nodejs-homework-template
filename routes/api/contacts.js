const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const {
  validateBody,
  validateUpdateBody,
  validateUpdateBodyFavorite,
  isValidId,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateUpdateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateUpdateBodyFavorite(schemas.updateFavoriteSchemas),
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
