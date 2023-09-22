const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/constacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../validators/validate");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(contactSchema), ctrl.add);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(favoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
