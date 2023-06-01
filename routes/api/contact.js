const express = require("express");

const {
  getAllMovies,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts-controller");

const schemas = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getAllMovies);

router.get("/:contactId", authenticate, isValidId, getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  addContact
);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.contactAddSchema),
  isValidId,
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  updateFavorite
);

module.exports = router;
