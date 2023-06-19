const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middleware");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", isValidId, ctrl.deleteById);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemas.favoriteUpdateSchema),
  ctrl.updateFavorite
);

module.exports = router;
