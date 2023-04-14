const express = require("express");

const {
  getAllContacts,
  getById,
  addContact,
  updateById,
  deleteById,
  updateFavorite,
} = require("../../controllers");

const {
  bodyValidator,
  addBodyValidator,
  isValidId,
  updateFavoriteStatus,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContacts);

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
  updateFavoriteStatus(schemas.updateFavoriteSchema),
  updateFavorite
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
