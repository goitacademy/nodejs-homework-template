const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteContact,
  update,
  updateFavorite,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.delete("/:id", isValidId, deleteContact);

router.put("/:id", isValidId, validateBody(schemas.addSchema), update);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchems),
  updateFavorite
);

module.exports = router;
