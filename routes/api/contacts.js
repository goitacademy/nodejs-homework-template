const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getByIdContact,
  addContact,
  updateByIdContact,
  updateStatusContact,
  deleteByIdContact,
} = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getByIdContact);

router.post("/", validateBody(schemas.addSchema), addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateByIdContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavorite),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteByIdContact);

module.exports = router;
