const express = require("express");

const wrapController = require("../../controllers/contactControllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const {
  contactSchema: { addSchema, updateFavoriteSchema },
} = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, wrapController.getAll);

router.get("/:id", authenticate, isValidId, wrapController.getById);

router.post("/", authenticate, validateBody(addSchema), wrapController.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addSchema),
  wrapController.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  wrapController.updateFavorite
);

router.delete("/:id", authenticate, isValidId, wrapController.deleteById);

module.exports = router;
