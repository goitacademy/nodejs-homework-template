const express = require("express");

const {
  getAll,
  getById,
  addContact,
  updateById,
  updateFavorite,
  deleteById,
} = require("../../controllers/contacts");

const {
  bodyValidator,
  addBodyValidator,
  isValidId,
  updateFavoriteStatus,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, addBodyValidator(schemas.addSchema), addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  bodyValidator(schemas.changeSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateFavoriteStatus(schemas.changeFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, deleteById);

module.exports = router;
