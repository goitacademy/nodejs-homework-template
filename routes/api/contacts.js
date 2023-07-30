const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const schemas = require("../../schemas/contacts");

const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.post);

router.delete("/:id", isValidId, ctrl.remove);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.put);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
