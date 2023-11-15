const express = require("express");

const wrapController = require("../../controllers/contactControllers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", wrapController.getAll);

router.get("/:id", isValidId, wrapController.getById);

router.post("/", validateBody(schemas.addSchema), wrapController.add);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  wrapController.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  wrapController.updateFavorite
);

router.delete("/:id", isValidId, wrapController.deleteById);

module.exports = router;
