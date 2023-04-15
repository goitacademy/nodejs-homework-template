const express = require("express");

const {
  getAll,
  getById,
  addContact,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const {
  bodyValidator,
  addBodyValidator,
  isValidId,
  updateFavoriteStatus,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", addBodyValidator(schemas.addSchema), addContact);

router.put(
  "/:contactId",
  isValidId,
  bodyValidator(schemas.changeSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  updateFavoriteStatus(schemas.changeFavoriteSchema),
  updateFavorite
);

// router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
