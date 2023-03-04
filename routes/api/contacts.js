const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
  updateFavorite,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), add);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  update
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchems),
  updateFavorite
);

module.exports = router;
