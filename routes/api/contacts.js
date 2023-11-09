const express = require("express");

const router = express.Router();

const { controllersContacts } = require("../../controllers");

const {
  getAllContacts,
  getByIdContact,
  addContact,
  updateByIdContact,
  updateStatusContact,
  deleteByIdContact,
} = controllersContacts;

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getByIdContact);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateByIdContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavorite),
  updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, deleteByIdContact);

module.exports = router;
