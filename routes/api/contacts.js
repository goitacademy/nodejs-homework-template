const express = require("express");

const wrapController = require("../../controllers/contactControllers");

const { validateBody, isValidId } = require("../../middlewares");

const {
  contactSchema: { addSchema, updateFavoriteSchema },
} = require("../../schemas");

const router = express.Router();

router.get("/", wrapController.getAll);

router.get("/:id", isValidId, wrapController.getById);

router.post("/", validateBody(addSchema), wrapController.add);

router.put(
  "/:id",
  isValidId,
  validateBody(addSchema),
  wrapController.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  wrapController.updateFavorite
);

router.delete("/:id", isValidId, wrapController.deleteById);

module.exports = router;
